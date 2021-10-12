import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';



const appLogin: string = process.env.APPEmail as string;
const appPassword: string = process.env.APPPASSWORD as string;

export function sendEmail(from: string, to: string, subject: string, text: string, html: string, 
    callback: ((err: Error | null, info: SentMessageInfo) => void) | undefined): void {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: appLogin,
            pass: appPassword // app-password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    }, callback!);
}

