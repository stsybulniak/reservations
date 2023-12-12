import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReservationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
