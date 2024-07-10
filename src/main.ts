import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import * as morgan from "morgan"
import { cors } from "./constant"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ApiKeyMiddleware } from "./middlewares/api-key/api-key.middleware"

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["log", "error", "warn", "debug", "verbose"],
    })

    const apiKeyMiddleware = new ApiKeyMiddleware();
    app.use(apiKeyMiddleware.use.bind(apiKeyMiddleware));
    app.use(morgan("tiny"))
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    )


    const options = new DocumentBuilder()
        .setTitle("API Argos")
        .setDescription("API Documentation for Argos Project")
        .setVersion("1.0")
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup("swagger", app, document)

    const configService = app.get(ConfigService)
    
    app.enableCors(cors)
    app.setGlobalPrefix("api")

    await app.listen(configService.get("PORT"))
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
