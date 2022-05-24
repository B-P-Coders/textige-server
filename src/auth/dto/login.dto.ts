import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
    @ApiProperty({
        description: "User's username",
    })
    username: string

    @ApiProperty({
        description: "User's password",
    })
    password: string
}
