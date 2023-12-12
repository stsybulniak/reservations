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

  async getReservationsByUser(userId: number) {
    const resp = new Map<bigint, ReservationResponse[]>();
    const groupedReservations =
      await this.reservationsRepository.getReservationsByUser(userId);
    for (const [date, reservations] of groupedReservations) {
      resp.set(
        date,
        reservations.map((reservation) => new ReservationResponse(reservation)),
      );
    }

    return resp;
  }
}
