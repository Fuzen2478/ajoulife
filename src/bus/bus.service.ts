import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { bus_stop, bus_route, bus_notice } from '@prisma/client/index';

@Injectable()
export class BusService {
  constructor(private prisma: PrismaService) {}

  async getStops(): Promise<bus_stop[]> {
    const stops = await this.prisma.bus_stop.findMany();
    const updatedData = JSON.stringify(stops, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getStopById(id: number): Promise<bus_stop> {
    const stop = await this.prisma.bus_stop.findUnique({
      where: {
        bus_stop_id: id,
      },
    });
    const updatedData = JSON.stringify(stop, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getRoutes(): Promise<bus_route[]> {
    const routes = await this.prisma.bus_route.findMany();
    const updatedData = JSON.stringify(routes, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getRouteById(id: number): Promise<bus_route> {
    const route = await this.prisma.bus_route.findUnique({
      where: {
        bus_route_id: id,
      },
    });
    const updatedData = JSON.stringify(route, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getNotices(): Promise<bus_notice[]> {
    const notices = await this.prisma.bus_notice.findMany();
    const updatedData = JSON.stringify(notices, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }

  async getNoticeById(id: number): Promise<bus_notice> {
    const notice = await this.prisma.bus_notice.findUnique({
      where: {
        bus_notice_id: id,
      },
    });
    const updatedData = JSON.stringify(notice, (key, value) =>
      typeof value === 'bigint' ? (value = Number(value.toString())) : value,
    );
    return JSON.parse(updatedData);
  }
}
