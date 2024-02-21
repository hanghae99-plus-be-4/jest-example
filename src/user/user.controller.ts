import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createName(@Body() name: any) {
    if (typeof name !== 'string') {
      throw new Error('name must be a string');
    }
    return this.userService.createName(name);
  }

  @Post('age')
  createUserAge(@Body() age: number) {
    if (age < 20) {
      throw new Error('age must be over 20');
    }
    if (age > 100) {
      throw new Error('age must be under 100');
    }
    return this.userService.createUserAge(age);
  }

  @Get(':id')
  findAll() {
    return this.userService.findAll();
  }
}
