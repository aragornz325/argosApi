import { ConfigModule, ConfigService, registerAs } from "@nestjs/config"
import { token } from "morgan"

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
})

const configService = new ConfigService()

export default registerAs("config", () => {
    return {
        postgres: {
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USER"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_NAME"),
        },
        bcrypt: {
            salt: configService.get("SALT_ROUNDS"),
        },
        security: {
            apiKey: configService.get("API_KEY"),
            tokenSecret: configService.get("TOKEN_SECRET"),
            tokenExpiration: configService.get("TOKEN_EXPIRATION"),
        },
        cloudinary: {
            cloudName: configService.get("CLOUD_NAME"),
            apiKey: configService.get("CLOUDINARY_API_KEY"),
            apiSecret: configService.get("API_SECRET"),
        },
    }
})
