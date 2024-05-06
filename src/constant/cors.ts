import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const cors: CorsOptions = {
    origin: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    credentials: true,
} 