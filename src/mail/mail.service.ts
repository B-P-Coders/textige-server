import { Injectable } from "@nestjs/common"
import * as mail from "nodemailer"
import ejs from "ejs"

@Injectable()
export class MailService {
    public errorMail(message: string): void {
        const transporter = this.getTransporter()

        transporter.sendMail(
            {
                from: process.env.MAIL,
                to: process.env.ADMIN_MAIL,
                subject: "Błąd na produkcji!",
                text: ejs.renderFile("../../mail-templates/error.ejs", {
                    error: message,
                }),
            },
            function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Sent: " + info.response)
                }
            },
        )
    }
    public welcomeMail(to: string, username: string, link: string): void {
        const transporter = this.getTransporter()
        transporter.sendMail(
            {
                from: process.env.MAIL,
                to: to,
                subject: "Witaj w textige",
                text: ejs.renderFile("../../mail-templates/welcome.ejs", {
                    username: username,
                    link: link,
                }),
            },
            function (err, info) {
                if (err) {
                    console.log(err)
                    this.errorMail(err.message)
                } else {
                    console.log("Sent: " + info.response)
                }
            },
        )
    }

    private getTransporter() {
        return mail.createTransport({
            service: "hotmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        })
    }
}
