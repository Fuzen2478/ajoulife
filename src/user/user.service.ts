import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { member } from '@prisma/client/index';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //SIGNUP
  async signup(createUserDto: CreateUserDto): Promise<member> {
    const { email, password } = createUserDto;
    const user = {
      auth: 'MEMBER',
      email: email,
      nickname: email.split('@')[0],
      password: await bcrypt.hash(password, 10),
    };
    const createdUser = await this.prisma.member.create({
      data: user,
    });
    return createdUser;
  }

  //LOGIN
  async login(email: string, password: string): Promise<member> {
    const user = await this.prisma.member.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('이메일이 존재하지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  //CHANGE NICKNAME
  async changeNickname(userId: number, newNickname: string): Promise<member> {
    const updatedUser = await this.prisma.member.update({
      where: { member_id: userId },
      data: { nickname: newNickname },
    });
    return updatedUser;
  }

  //RESET PASSWORD
  async resetPassword(email: string, newPassword: string): Promise<member> {
    const user = await this.prisma.member.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('이메일이 존재하지 않습니다.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.prisma.member.update({
      where: { member_id: user.member_id },
      data: { password: hashedNewPassword },
    });

    return updatedUser;
  }

  //DELETE USER
  async deleteUser(userId: number): Promise<void> {
    await this.prisma.member.delete({
      where: { member_id: userId },
    });
  }

  //check duplicate email
  async checkDuplicateEmail(email: string): Promise<boolean> {
    const user = await this.prisma.member.findUnique({
      where: { email: email },
    });
    return !!user;
  }

  //find user by email
  async findOneByEmail(email: string): Promise<member> {
    const user = await this.prisma.member.findUnique({
      where: { email: email },
    });
    return user;
  }

  //send verification email
}
