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
}
