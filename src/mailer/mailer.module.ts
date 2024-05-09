import { Module } from '@nestjs/common';
import { MailerService } from './services/mailer.service';
import { MailerController } from './controller/mailer.controller';

@Module({
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
