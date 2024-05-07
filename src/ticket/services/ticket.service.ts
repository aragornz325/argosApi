import { Injectable } from '@nestjs/common';
import { TrafficTicketENTITY } from '../entities/trafficTicket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { trafficTicketDTO } from '../DTO/trafficTicket.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TrafficTicketENTITY)
        private readonly userRepository: Repository<TrafficTicketENTITY>,
    ) {}

   public async  create(trafficTicket: trafficTicketDTO): Promise<TrafficTicketENTITY> {
        try {
            const ticket: TrafficTicketENTITY  = await this.userRepository.save(trafficTicket);
            if (!ticket) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: "Error creating ticket",
                })
            }
            return ticket;
        } catch(error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findAll(): Promise<TrafficTicketENTITY[]>{
       try {
        const tickets: TrafficTicketENTITY[] = await this.userRepository.find({
            relations:{
                user: true
            }
        });
        if(tickets.length === 0) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: "No tickets found"
            })
        }
        return tickets;
       } catch(error) {
        
       }
    }
}
