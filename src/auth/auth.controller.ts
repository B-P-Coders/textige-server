import { Controller, Body, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { RegisterDto, LoginDto } from "./dto"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto.username, dto.password)
    }

    @Post("register")
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.username, dto.email, dto.password)
    }
}
