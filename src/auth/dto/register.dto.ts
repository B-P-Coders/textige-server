import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
    @ApiProperty({
        description: "User's email",
    })
    email: string

    @ApiProperty({
        description: "User's username",
    })
    username: string

    @ApiProperty({
        description: "User's password",
    })
    password: string
}
