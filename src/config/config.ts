import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";


ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export default registerAs('config', () => {
    return {
        postgres:{
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
        }
    }
});

