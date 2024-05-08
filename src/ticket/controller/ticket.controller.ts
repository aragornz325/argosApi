import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { trafficTicketDTO } from '../DTO/trafficTicket.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ticket')
@UseGuards(AuthGuard)
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    create( 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
                new FileTypeValidator({fileType: '.(jpg|jpeg|png)'})
                ]
            })
        ) file: Express.Multer.File, 
        @Body() body: trafficTicketDTO,
        @Req() req: Request) {
        
        return this.ticketService.createTicket({
            trafficTicket: body,
            userId: req.idUser,
            file: file
            
        });
    }

    @Get()
    findAll() {
        return this.ticketService.findAll();
    }
}
