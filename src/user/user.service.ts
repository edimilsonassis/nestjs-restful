import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { createHash } from 'crypto';

import { MailerService } from './../mailer.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DtoUser } from './user.dto';
import { HttpService } from '@nestjs/axios/dist';
import { RabbitMQService } from 'src/rabbitmqr.service';

const _path_assets_avatar = (hash: string, userId: number) =>
  `${process.cwd()}\\src\\assets\\${hash}.${userId}.jpg`;

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<DtoUser>,
    private readonly httpService: HttpService,
    private rabbitMQService: RabbitMQService,
  ) {
    //
  }

  async findAll(): Promise<DtoUser[]> {
    const data = await this.userModel.find();

    return data;
  }

  async findOne(userId: number): Promise<DtoUser> {
    const { data } = await this.httpService.axiosRef.get(`users/${userId}`);

    return data.data;
  }

  async saveAvatar(avatarUrl: string, userId: number): Promise<Buffer> {
    const response = await this.httpService.axiosRef.get(avatarUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data, 'binary');

    const hash = createHash('sha256').update(buffer).digest('hex');

    writeFileSync(_path_assets_avatar(hash, userId), buffer);

    // await this.userModelAvatar.deleteMany({ userId });

    // await this.userModelAvatar.create({ userId, hash });

    return buffer;
  }

  async getAddress(_id: string): Promise<DtoUser> {
    const data = await this.userModel.findById(_id, 'address');

    return data;
  }

  async getAvatar(id: number): Promise<string> {
    // find the avatar in Mongo
    const data = await this.userModel.findOne({ id });
    const hash = data?.avatar;

    // if there is a hash, read the file and return the base64
    // if you find an error, follow the code to download again
    if (hash) {
      try {
        const buffer = readFileSync(_path_assets_avatar(hash, id));
        return buffer.toString('base64');
      } catch {
        // nothing to do
      }
    }

    const { avatar } = await this.findOne(id);
    const buffer2 = await this.saveAvatar(avatar, id);

    return buffer2.toString('base64');
  }

  async deleteAvatar(id: number): Promise<any> {
    // find the avatar in Mongo
    const data = await this.userModel.findOne({ id });
    const hash = data?.avatar;

    if (hash)
      try {
        unlinkSync(_path_assets_avatar(hash, id));
        return;
      } catch {
        // nothing to do
      }

    throw new HttpException(`Avatar file image not found`, 500);
  }

  async deleteOne(userId: number): Promise<any> {
    const deletedUser = await this.userModel.deleteOne({ id: userId });

    return deletedUser;
  }

  async deleteAll(): Promise<any> {
    const deletedUser = await this.userModel.deleteMany();

    return deletedUser;
  }

  async create(User: DtoUser) {
    await this.httpService.axiosRef.post(`users`, User);

    const mongoData = [];

    for (let index = 0; index < 10; index++) {
      const createdUser = new this.userModel(User);
      mongoData.push(await createdUser.save());
    }

    const sendEmail = false;
    const sendRabbit = false;

    // https://nodemailer.com/usage/
    if (sendEmail) {
      const mailerService = new MailerService();

      await mailerService.sendMail(
        'email@email.com',
        'New User Notification!',
        'Hello!',
      );
    }

    // https://docs.nestjs.com/microservices/rabbitmq
    if (sendRabbit) {
      this.rabbitMQService.sendNewUserMessage(
        `Hellowwwww ${User.first_name}!!!`,
      );
    }

    return mongoData;
  }
}
