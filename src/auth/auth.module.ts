import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { DatabaseModule } from "../database/database.module"
import { ConfigModule } from "@nestjs/config"
import { JwtStrategy } from "./strategy"

@Module({
    imports: [DatabaseModule, JwtModule.register({}), ConfigModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
