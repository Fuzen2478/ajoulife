import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { member } from '@prisma/client/index';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  //SIGNUP
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<member> {
    return this.userService.signup(createUserDto);
  }

  //LOGIN
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<member> {
    return this.userService.login(email, password);
  }

  // CHANGE NICKNAME
  @Post(':id/change-nickname')
  async changeNickname(
    @Param('id') userId: number,
    @Body('nickname') newNickname: string,
  ): Promise<member> {
    return this.userService.changeNickname(userId, newNickname);
  }

  // RESET PASSWORD
  @Post(':id/reset-password')
  async resetPassword(
    @Param('id') userId: number,
    @Body('newPassword') newPassword: string,
  ): Promise<member> {
    return this.userService.resetPassword(userId.toString(), newPassword);
  }

  // DELETE USER
  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  // CHECK DUPLICATE EMAIL
  @Get('check-duplicate-email/:email')
  async checkDuplicateEmail(@Param('email') email: string): Promise<boolean> {
    return this.userService.checkDuplicateEmail(email);
  }

  //DELETE USER
}
