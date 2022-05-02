import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { DatabaseModule } from "../database/database.module"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [DatabaseModule, JwtModule.register({}), ConfigModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
