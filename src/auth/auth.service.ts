import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        private database: DatabaseService,
    ) {}

    public async login(username: string, password: string) {
        if (!username || !password)
            throw new ForbiddenException("No username or password")
        try {
            const user = await this.database.getUser(username, password)
            return { auth_token: await this.signToken(user.id, user.username) }
        } catch {
            throw new ForbiddenException("Invalid username or password")
        }
    }

    public register(username: string, email: string, password: string) {
        if (!username || !password)
            throw new ForbiddenException("No username or password")
        try {
            this.database.createUser(username, email, password)
            return { message: "success" }
        } catch {
            throw new InternalServerErrorException("Failed to create user")
        }
    }

    private async signToken(userId: number, username: string): Promise<string> {
        const payload = { sub: userId, username: username }
        const secret = this.config.get("JWT_SECRET")
        return await this.jwt.signAsync(payload, {
            expiresIn: "1d",
            secret: secret,
        })
    }
}
