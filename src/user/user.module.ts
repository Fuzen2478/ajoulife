import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
