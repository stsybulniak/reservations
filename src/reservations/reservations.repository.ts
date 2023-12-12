import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationsRepository {
  constructor(private prisma: PrismaService) {}

  getReservationsByAmentityIdAndTimestamp(
    amenityId: number,
    timestamp: bigint,
  ) {
    return this.prisma.reservation.findMany({
      where: { date: timestamp, amenityId },
      orderBy: [{ startTime: 'asc' }],
      include: { amenity: { select: { name: true } } },
    });
  }

  async getReservationsByUser(userId: number) {
    const reservaitons = await this.prisma.reservation.findMany({
      where: { userId },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      include: { amenity: { select: { name: true } } },
    });

    const groupByDay = reservaitons.reduce<Map<bigint, typeof reservaitons>>(
      (res, reservation) => {
        res.has(reservation.date)
          ? res.get(reservation.date).push(reservation)
          : res.set(reservation.date, [reservation]);

        return res;
      },
      new Map(),
    );

    return groupByDay;
  }
}
