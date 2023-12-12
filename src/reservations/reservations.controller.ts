import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('/')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('amenity/:amentityId/day/:timestamp')
  @UseInterceptors(ClassSerializerInterceptor)
  getReservationsByAmentityIdAndTimestamp(
    @Param('amentityId') amenityId: number,
    @Param('timestamp') timestamp: bigint,
  ) {
    return this.reservationsService.getReservationsByAmentityIdAndTimestamp(
      amenityId,
      timestamp,
    );
  }
}
