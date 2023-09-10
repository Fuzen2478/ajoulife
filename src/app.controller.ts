import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { board } from '@prisma/client/index';

@Controller('notices')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getNotices(): Promise<board[]> {
    return this.appService.getNotices();
  }

  @Get(':id')
  async getNoticeById(@Param('id') id: string): Promise<board> {
    const noticeId = Number(id);

    if (isNaN(noticeId)) {
      return null;
    }

    return this.appService.getNoticeById(noticeId);
  }

  @Get('/latest')
  getLatestNotice() {
    return this.appService.getLatestNotice();
  }
}
