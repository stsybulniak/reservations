import { Exclude, Expose, Transform } from 'class-transformer';
import { IReservationResponse } from './interfaces/IReservationResponse';
import { ReservationsRepository } from '../reservations.repository';
import { ApiProperty } from '@nestjs/swagger';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

function padToTwoDigits(num: number) {
  return num.toString().padStart(2, '0');
}

export class ReservationResponse implements IReservationResponse {
  constructor(
    reservation: ArrayElement<
      Awaited<
        ReturnType<
          ReservationsRepository['getReservationsByAmentityIdAndTimestamp']
        >
      >
    >,
  ) {
    Object.assign(this, reservation);
  }

  @ApiProperty({ example: 102, description: 'Reservation id' })
  id: number;
  @ApiProperty({ example: 155, description: 'User id' })
  userId: number;
  @ApiProperty({
    type: 'string',
    example: '01:00',
    description: 'Reservation start time',
  })
  @Transform(({ value }) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
  })
  startTime: number;
  @Exclude()
  endTime: number;
  @Exclude()
  amenityId: number;
  @Exclude()
  date: bigint;
  @ApiProperty({ example: 720, description: 'Reservation duration in minutes' })
  @Expose()
  get duration(): number {
    return this.endTime - this.startTime;
  }
  @ApiProperty({
    example: 'Mitel Networks Corporation',
    description: 'Amenity name',
  })
  @Transform(({ value }) => value.name)
  amenity: string;
}
