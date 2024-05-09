import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { DataSourceConfig } from "./config/data.source"

import { TaskModule } from "./task/task.module"
import { UserModule } from "./user/user.module"
import { ProjectModule } from "./project/project.module"
import { AuthModule } from "./auth/auth.module"
import { TicketModule } from './ticket/ticket.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailerModule } from './mailer/mailer.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            ...DataSourceConfig,
        }),
        TaskModule,
        UserModule,
        ProjectModule,
        AuthModule,
        TicketModule,
        CloudinaryModule,
        MailerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
