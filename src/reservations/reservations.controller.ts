import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ReservationResponse } from './entities/reservationsResponse';

@Controller('/')
@ApiTags('Reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('amenity/:amentityId/day/:timestamp')
  @ApiParam({ type: 'number', name: 'amentityId', example: 1 })
  @ApiParam({
    type: 'integer',
    format: 'int64',
    name: 'timestamp',
    example: 1589846400000,
  })
  @ApiOperation({ summary: 'Get reservations by amenity_id and timestamp' })
  @ApiOkResponse({
    description: 'Array of reservation records belong to amenity_id',
    type: [ReservationResponse],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  getReservationsByAmentityIdAndTimestamp(
    @Param('amentityId') amenityId: number,
    @Param('timestamp') timestamp: bigint,
  ): Promise<ReservationResponse[]> {
    return this.reservationsService.getReservationsByAmentityIdAndTimestamp(
      amenityId,
      timestamp,
    );
  }

  @Get('reservations/user/:userId')
  @ApiParam({ type: 'number', name: 'userId', example: 1 })
  @ApiOperation({ summary: 'Get reservations by userId and grouped by days' })
  @ApiOkResponse({
    description:
      'Array of reservation records belong to user_id and groped by day',
    schema: {
      type: 'object',
      properties: {
        '1589846400000': {
          type: 'array',
          items: { $ref: getSchemaPath(ReservationResponse) },
        },
      },
    },
  })
  @UseInterceptors(ClassSerializerInterceptor)
  getReservationsByUser(
    @Param('userId') userId: number,
  ): Promise<Map<bigint, ReservationResponse[]>> {
    return this.reservationsService.getReservationsByUser(userId);
  }
}
