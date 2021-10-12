"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var nodemailer_1 = __importDefault(require("nodemailer"));
var appLogin = process.env.APPEmail;
var appPassword = process.env.APPPASSWORD;
function sendEmail(from, to, subject, text, html, callback) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer_1.default.createTransport({
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
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    }, callback);
}
exports.sendEmail = sendEmail;
