import { ApiProperty } from "@nestjs/swagger"

export class SendDto {
    @ApiProperty()
    receiver: number

    @ApiProperty()
    message: string
}
