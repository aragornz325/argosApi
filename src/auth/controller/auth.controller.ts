import { Controller, Post, Get, Body, Param, Query } from "@nestjs/common"
import { AuthService } from "../services/auth.service"
import { AuthBody } from "../interfaces/auth.interfaces"

@Controller("auth")
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Post("login")
    login(@Body() body: AuthBody) {
        return this.AuthService.login(body)
    }
}
