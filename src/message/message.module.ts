import { Module } from "@nestjs/common"
import { DatabaseModule } from "src/database/database.module"
import { MessageController } from "./message.controller"
import { MessageService } from "./message.service"

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
