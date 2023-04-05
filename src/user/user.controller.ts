import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DtoUser } from './user.dto';
import { UserService } from 'src/user/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Get(':userId')
  public async findOne(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DtoUser> {
    return await this.userService.findOne(userId);
  }

  @Post()
  async create(@Body() User: DtoUser) {
    return this.userService.create(User);
  }

  @Get(':userId/avatar')
  public async findOneAvatar(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<string> {
    const avatar = await this.userService.getAvatar(userId);
    return `data:image/png;base64,${avatar}`;
  }

  @Get(':userId/address')
  public async findOneAddressess(
    @Param('userId') userId: string,
  ): Promise<DtoUser> {
    const result = await this.userService.getAddress(userId);
    return result;
  }

  @Delete(':userId/avatar')
  public async deleteOneAvatar(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any> {
    const result = await this.userService.deleteAvatar(userId);
    return result;
  }
}
