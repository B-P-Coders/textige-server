import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { JwtGuard } from "src/auth/guard"
import { MessageService } from "./message.service"
import { GetUser } from "src/auth/decorator"

@UseGuards(JwtGuard)
@Controller("message")
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post("send")
    public async send(
        @Body("message") message: string,
        @Body("receiver") receiver: number,
        @GetUser("sub") sender: number,
    ) {
        return await this.messageService.send(message, +sender, +receiver)
    }

    @Get("get-all-from/:receiver")
    public async getAllFrom(
        @GetUser("sub") sender: number,
        @Param("receiver") receiver: number,
    ) {
        return await this.messageService.getAllMessagesFrom(+sender, +receiver)
    }

    @Get("get-unread-number/:receiver")
    public async getUnreadNumber(
        @GetUser("sub") sender: number,
        @Param("receiver") receiver: number,
    ) {
        return await this.messageService.getNumberOfUnreadMessages(
            +sender,
            +receiver,
        )
    }

    @Get("get-number-from/:receiver")
    public async getNumberFrom(
        @GetUser("sub") sender: number,
        @Param("receiver") receiver: number,
    ) {
        return await this.messageService.getNumberOfMessagesFrom(
            +sender,
            +receiver,
        )
    }

    @Get("mark-as-read/:id")
    public async markAsRead(
        @GetUser("sub") sender: number,
        @Param("id") id: number,
    ) {
        return await this.messageService.markAsRead(+sender, +id)
    }
}
