import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import config from "config/config"

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
    private readonly apiKey = config().security.apiKey

    use(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers["x-api-key"]

        if (!apiKey || apiKey !== this.apiKey) {
            return res.status(403).json({ message: "Invalid API key" })
        }

        next()
    }
}
