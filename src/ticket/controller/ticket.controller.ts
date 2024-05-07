import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { trafficTicketDTO } from '../DTO/trafficTicket.dto';

@Controller('ticket')
export class TicketController {
    constructor(private readonly userService: TicketService) {}

    @Post()
    create(@Body() body: trafficTicketDTO) {
        return this.userService.create(body);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }
}
