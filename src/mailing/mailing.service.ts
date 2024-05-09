import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDTO } from 'user/dto/user.dto';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserDTO) {
    const url = `https://www.youtube.com/channel/UCvXekawNgmVfd615D52nNow`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Bienvenido, ${user.username}!.`,
      template: 'traffic_ticket',
      context: {
        name: user.username,
        url,
      },
    });
  }
}