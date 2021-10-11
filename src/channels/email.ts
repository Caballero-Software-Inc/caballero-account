import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const appLogin = process.env.APPEmail;
const appPassword = process.env.APPPASSWORD;

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
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    });

}

