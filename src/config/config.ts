import { ConfigModule, ConfigService, registerAs } from "@nestjs/config"
import { token } from "morgan"

ConfigModule.forRoot({
    envFilePath: '.dev.env',//envFilePath: `.${process.env.NODE_ENV}.env`,
})

const configService = new ConfigService()

export default registerAs("config", () => {
    return {
        postgres: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        bcrypt: {
            salt: process.env.SALT_ROUNDS || "10", // Valor predeterminado como cadena 
        },
        security: {
            apiKey: process.env.API_KEY,
            tokenSecret: process.env.TOKEN_SECRET,
            tokenExpiration: process.env.TOKEN_EXPIRATION,
        },
        cloudinary: {
            cloudName: process.env.CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.API_SECRET,
        },
    }
})
