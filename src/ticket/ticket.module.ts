import { Module } from '@nestjs/common';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TrafficTicketENTITY } from './entities/trafficTicket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficTicketENTITY])],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
