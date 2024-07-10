import { Injectable, Logger } from '@nestjs/common';
import { TrafficTicketENTITY } from '../entities/trafficTicket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { trafficTicketDTO } from '../DTO/trafficTicket.dto';
import { ErrorManager } from 'utils/error.manager';
import { UserService } from 'user/service/user.service';
import { CloudinaryService } from 'cloudinary/services/cloudinary.service';
import { CloudinaryResponse } from 'cloudinary/interfaces/cloudinary.interface';
import { MailingService } from 'mailing/mailing.service';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TrafficTicketENTITY)
        private readonly userRepository: Repository<TrafficTicketENTITY>,
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService,
        private mailingService: MailingService,
    ) {}

   public async createTicket(
    {trafficTicket, userId, file}:
    {trafficTicket: trafficTicketDTO, 
    userId: string, 
    file: Express.Multer.File}
): Promise<TrafficTicketENTITY> {
        try {
            Logger.log(`Creating ticket for user ${userId}`);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                Logger.error(`User ${userId} not found`);
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: "User not found"
                })
            }


            Logger.log(`Uploading image to cloudinary`);
            const photo: CloudinaryResponse = await this.cloudinaryService.uploadImage({
                file:file,
                date: trafficTicket.date,
            });
            if (!photo) {
                Logger.error(`Error uploading image`);
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: "Error uploading image"
                })
            }
            
            Logger.log(`Creating ticket`);

            
            const ticket: TrafficTicketENTITY  = await this.userRepository.save({
                ...trafficTicket,
                longitude: parseFloat(trafficTicket.longitude),
                latitude: parseFloat(trafficTicket.latitude),
                user, 
                photoURL: photo.secure_url,
            });

            if (!ticket) {
                Logger.error(`Error creating ticket`);
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: "Error creating ticket",
                })
            }

            if (ticket.driverEmail != null && ticket.driverEmail != "" && ticket.driverEmail != undefined) {
                try {
                    await this.mailingService.sendTicketToOffender(ticket);
                } catch (error) {
                    console.log(error);
                }
            }
            Logger.log(`Ticket created successfully`);
            return ticket;
        } catch(error) {
            throw ErrorManager.createSignatureError(error.stack);
        }
    }

    public async findAll(): Promise<TrafficTicketENTITY[]>{
       try {
        const tickets: TrafficTicketENTITY[] = await this.userRepository.find({
            relations: {
                user: {
                    profile: true
                }
            }
        });
        if(tickets.length === 0) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: "No tickets found"
            })
        }
        tickets.forEach(ticket => { 
            delete ticket.user.password
        }
        );
        return tickets;
       } catch(error) {
        
       }
    }
}
