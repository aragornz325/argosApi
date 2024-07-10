import { Module } from '@nestjs/common';
import { TicketController } from './controller/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TrafficTicketENTITY } from './entities/trafficTicket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';
import { UserService } from 'user/service/user.service';
import { CloudinaryModule } from 'cloudinary/cloudinary.module';
import { CloudinaryService } from 'cloudinary/services/cloudinary.service';
import { MailingModule } from 'mailing/mailing.module';

@Module({
  imports: [UserModule,CloudinaryModule, TypeOrmModule.forFeature([TrafficTicketENTITY]) , MailingModule],
  controllers: [TicketController],
  providers: [TicketService, UserService, CloudinaryService],
})
export class TicketModule {}
