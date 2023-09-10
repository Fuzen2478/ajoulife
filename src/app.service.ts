import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { board } from '@prisma/client/index';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getNotices(): Promise<board[]> {
    const notices = await this.prisma.board.findMany();
    const updatedData = JSON.stringify(notices, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getLatestNotice(): Promise<board> {
    const notice = await this.prisma.board.findFirst({
      orderBy: {
        board_id: 'desc',
      },
    });
    const updatedData = JSON.stringify(notice, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getNoticeById(id: number): Promise<board> {
    const notice = await this.prisma.board.findUnique({
      where: {
        board_id: id,
      },
    });
    const updatedData = JSON.stringify(notice, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }
}
