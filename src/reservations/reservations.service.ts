import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationResponse } from './entities/reservationsResponse';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async getReservationsByAmentityIdAndTimestamp(
    amenityId?: number,
    timestamp?: bigint,
  ) {
    const reservations =
      await this.reservationsRepository.getReservationsByAmentityIdAndTimestamp(
        amenityId,
        timestamp,
      );

    return reservations.map(
      (reservation) => new ReservationResponse(reservation),
    );
  }
}
