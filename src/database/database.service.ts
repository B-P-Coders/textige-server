import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

@Injectable()
export class DatabaseService extends PrismaClient {
    private saltRounds = 10
    private salt = bcrypt.genSaltSync(this.saltRounds)
    constructor(private configService: ConfigService) {
        super()
    }

    async getUser(username: string, password: string) {
        const user = await this.user.findFirst({
            select: {
                id: true,
                username: true,
                password: true,
            },
            where: {
                username: username,
            },
        })
        if (!user) throw new Error("User not found")
        if (!bcrypt.compareSync(password, user.password))
            throw new Error("Invalid password")
        delete user.password
        return user
    }

    async createUser(username: string, email: string, password: string) {
        if (!this.verifyMail(email)) throw new Error("Invalid email")
        await this.user.create({
            data: {
                username: username,
                email: email,
                password: bcrypt.hashSync(password, this.salt),
            },
        })
    }

    private verifyMail(email: string) {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // TODO: verify mail by pinging mail server
        return re.test(email)
    }
}
