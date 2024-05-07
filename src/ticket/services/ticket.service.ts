import { Injectable } from '@nestjs/common';
import { TrafficTicketENTITY } from '../entities/trafficTicket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { trafficTicketDTO } from '../DTO/trafficTicket.dto';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TrafficTicketENTITY)
        private readonly userRepository: Repository<TrafficTicketENTITY>,
    ) {}

    create(trafficTicket: trafficTicketDTO) {
        return this.userRepository.save(trafficTicket);
    }

    findAll() {
        return this.userRepository.find({
            relations:{
                user: true
            }
        });
    }
}
