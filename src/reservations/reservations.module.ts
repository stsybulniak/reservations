import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReservationsRepository } from './reservations.repository';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
  imports: [PrismaModule],
  exports: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
