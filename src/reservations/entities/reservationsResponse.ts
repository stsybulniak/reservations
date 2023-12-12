import { Exclude, Expose, Transform } from 'class-transformer';
import { IReservationResponse } from './interfaces/IReservationResponse';
import { ReservationsRepository } from '../reservations.repository';

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

  id: number;
  userId: number;
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
  @Expose()
  get duration(): number {
    return this.endTime - this.startTime;
  }
  @Transform(({ value }) => value.name)
  amenity: string;
}
