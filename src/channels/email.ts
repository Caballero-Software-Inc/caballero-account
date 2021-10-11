import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const appLogin: string = process.env.APPEmail as string;
const appPassword: string = process.env.APPPASSWORD as string;

export async function sendEmail(from: string, to: string, subject: string, text: string, html: string): Promise<void> {

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
    await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    });

}

