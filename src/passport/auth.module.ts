import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PassportService } from './passport.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [PassportService, AuthService, PrismaService],
  exports: [PassportService],
})
export class AuthModule {}
