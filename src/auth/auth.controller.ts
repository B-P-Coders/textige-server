import { Controller, Body, Post, Req } from "@nestjs/common"
import { Request } from "express"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(
        @Body("username") username: string,
        @Body("password") password: string,
    ) {
        return this.authService.login(username, password)
    }

    @Post("register")
    async register(
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string,
    ) {
        return this.authService.register(username, email, password)
    }
}
