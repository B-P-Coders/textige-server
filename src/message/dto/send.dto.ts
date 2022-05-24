import { ApiProperty } from "@nestjs/swagger"

export class SendDto {
    @ApiProperty({
        description: "Receiver ID",
        minimum: 1,
    })
    receiver: number

    @ApiProperty({
        description: "Message text",
    })
    message: string
}
