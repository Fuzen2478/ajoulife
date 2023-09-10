import { Controller, Get, Param } from '@nestjs/common';
import { BusService } from './bus.service';
import { bus_stop, bus_route, bus_notice } from '@prisma/client/index';

@Controller('bus/location')
export class BusController {
  constructor(private readonly BusService: BusService) {}

  @Get('stops')
  async getStops(): Promise<bus_stop[]> {
    return this.BusService.getStops();
  }

  @Get('stops/:id')
  async getStopById(@Param('id') id: string): Promise<bus_stop> {
    const stopId = Number(id);
    return this.BusService.getStopById(stopId);
  }

  @Get('routes')
  async getRoutes(): Promise<bus_route[]> {
    return this.BusService.getRoutes();
  }

  @Get('routes/:id')
  async getRouteById(@Param('id') id: string): Promise<bus_route> {
    const routeId = Number(id);
    return this.BusService.getRouteById(routeId);
  }
}

@Controller('bus/notices')
export class BusNoticeController {
  constructor(private readonly BusService: BusService) {}

  @Get()
  async getNotices(): Promise<bus_notice[]> {
    return this.BusService.getNotices();
  }

  @Get(':id')
  async getNoticeById(@Param('id') id: string): Promise<bus_notice> {
    const noticeId = Number(id);
    return this.BusService.getNoticeById(noticeId);
  }
}
