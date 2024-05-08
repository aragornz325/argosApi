import { Module } from '@nestjs/common';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TrafficTicketENTITY } from './entities/trafficTicket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/service/user.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service';

@Module({
  imports: [UserModule,CloudinaryModule, TypeOrmModule.forFeature([TrafficTicketENTITY])],
  controllers: [TicketController],
  providers: [TicketService, UserService, CloudinaryService],
})
export class TicketModule {}
