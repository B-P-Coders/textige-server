import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MailModule } from "./mail/mail.module"
import { AuthModule } from "./auth/auth.module"
import { DatabaseModule } from "./database/database.module"

@Module({
    imports: [
        MailModule,
        AuthModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
