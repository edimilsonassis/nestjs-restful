import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaUser, SchemaUserAddress } from './user/user.schema';
import { HttpModule } from '@nestjs/axios';
import { RabbitMQService } from './rabbitmqr.service';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_PASSWORD);

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://reqres.in/api',
    }),
    MongooseModule.forRoot(process.env.DB_HOST),
    MongooseModule.forFeature([
      { name: 'User', schema: SchemaUser },
      { name: 'UserAddress', schema: SchemaUserAddress },
    ]),
  ],
  controllers: [AppController, UsersController, UserController],
  providers: [AppService, UserService, MailerService, RabbitMQService],
})
export class AppModule {
  //
}
