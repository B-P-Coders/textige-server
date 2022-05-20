import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class MessageService {
    constructor(private databaseService: DatabaseService) {}

    public async send(message: string, sender: number, receiver: number) {
        try {
            await this.databaseService.message.create({
                data: {
                    content: message,
                    sender_id: sender,
                    receiver_id: receiver,
                },
            })
            return { message: "success" }
        } catch (e: any) {
            console.log(e)
            throw new InternalServerErrorException("Cannot send message")
        }
    }
    public async getAllMessagesFrom(sender: number, receiver: number) {
        try {
            const messages = await this.databaseService.message.findMany({
                select: {
                    id: true,
                    content: true,
                    send_time: true,
                },
                where: {
                    sender_id: sender,
                    receiver_id: receiver,
                },
            })
            return messages
        } catch (e: any) {
            console.log(e)
            throw new InternalServerErrorException("Cannot get messages")
        }
    }
    public async getNumberOfUnreadMessages(sender: number, receiver: number) {
        try {
            const numberOfMessages = await this.databaseService.message.count({
                where: {
                    sender_id: sender,
                    receiver_id: receiver,
                    read: false,
                },
            })
            return numberOfMessages
        } catch (e: any) {
            console.log(e)
            throw new InternalServerErrorException(
                "Cannot get number of messages",
            )
        }
    }
    public async getNumberOfMessagesFrom(sender: number, receiver: number) {
        try {
            const numberOfMessages = this.databaseService.message.count({
                where: {
                    sender_id: sender,
                    receiver_id: receiver,
                },
            })
            return numberOfMessages
        } catch (e: any) {
            console.log(e)
            throw new InternalServerErrorException(
                "Cannot get number of messages",
            )
        }
    }
    public async markAsRead(id: number, sender: number) {
        try {
            await this.databaseService.message.updateMany({
                where: {
                    id: id,
                    sender_id: sender,
                },
                data: {
                    read: true,
                },
            })
            return { message: "success" }
        } catch (e: any) {
            console.log(e)
            throw new InternalServerErrorException(
                "Cannot mark message as read",
            )
        }
    }
}
