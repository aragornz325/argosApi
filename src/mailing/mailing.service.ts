import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TrafficTicketENTITY } from 'ticket/entities/trafficTicket.entity';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  // async sendUserConfirmation(user: UserDTO) {
  //   const url = `https://www.youtube.com/channel/UCvXekawNgmVfd615D52nNow`;
  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     subject: `Bienvenido, ${user.username}!.`,
  //     template: 'traffic_ticket',
  //     context: {
  //       name: user.username,
  //       url,
  //     },
  //   });
  // }

  
  /**
   * Envía el ticket de infracción por correo electrónico al conductor infractor.
   */
  async sendTicketToOffender(ticket:TrafficTicketENTITY) {
    await this.mailerService.sendMail({
      to: ticket.driverEmail,
      subject: `Hola, ${ticket.driverName}. Tenés una infracción.`,
      template: 'traffic_ticket',
      context: {
        ...ticket
      },
    });
  }
}
