import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusController, BusNoticeController } from './bus/bus.controller';
import { BusService } from './bus/bus.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, BusController, BusNoticeController],
  providers: [AppService, BusService, PrismaService],
})
export class AppModule {}
