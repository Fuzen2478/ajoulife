import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { member } from '@prisma/client/index';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<member | null> {
    const member = await this.prisma.member.findUnique({
      where: { email },
    });

    if (!member || member.password !== password) {
      return null; // Invalid email or password
    }

    return member;
  }
}
