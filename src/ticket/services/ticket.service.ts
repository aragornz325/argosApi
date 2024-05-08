import { Injectable } from '@nestjs/common';
import { TrafficTicketENTITY } from '../entities/trafficTicket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { trafficTicketDTO } from '../DTO/trafficTicket.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UserService } from 'src/user/service/user.service';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service';
import { CloudinaryResponse } from 'src/interfaces/cloudinary.interface';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TrafficTicketENTITY)
        private readonly userRepository: Repository<TrafficTicketENTITY>,
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

   public async createTicket(
    {trafficTicket, userId, file}:
    {trafficTicket: trafficTicketDTO, 
    userId: string, 
    file: Express.Multer.File}
): Promise<TrafficTicketENTITY> {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: "User not found"
                })
            }
            const photo: CloudinaryResponse = await this.cloudinaryService.uploadImage(file);

            const ticket: TrafficTicketENTITY  = await this.userRepository.save({
                ...trafficTicket, 
                user, 
                photoURL: photo.photoUrl
            });
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
