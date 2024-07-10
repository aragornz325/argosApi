import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface"

export const cors: CorsOptions = {
    origin: ['http://localhost:3000'],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
}
