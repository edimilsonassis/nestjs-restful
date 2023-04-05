import { Controller, Delete, Post, Body, Get } from '@nestjs/common';
import { DtoUser } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Delete()
  public async deleteAll(): Promise<any> {
    const result = await this.userService.deleteAll();
    return result;
  }

  @Post()
  async create(@Body() User: DtoUser) {
    return this.userService.create(User);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
