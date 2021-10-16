'use strict';

import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import { putEmail, validUser } from '../db/awsDynamoDB';
import { uploadEmail } from '../db/awsS3';
import { makeId } from '../helpers/cryptoTools';


const router = express.Router();


router.post('/email/new', async function (req: any, res: any): Promise<void> {
    const { email, id, from, subject, html } = req.body;

    const isValidUser: boolean = await validUser(email, id);
    if (isValidUser) {
        const emailId: string = makeId(10);
        const emailDate: number = Date.now();
        const emailCode: string = emailId + String(emailDate);

        putEmail({ id: emailId, date: emailDate, email, from, subject });

        uploadEmail({
            name: emailCode + '.html',
            body: html
        });
        res.json({ ok: true, emailCode })
    } else {
        res.json({ ok: false })
    }
})


/*

router.post('/email/send', async function (req: any, res: any): Promise<void> {
    const { email, id, emailCode } = req.body;
    const emailId = emailCode.substring(0, 10);
    const emailDate = parseInt(emailCode.substring(10, emailCode.length));

    const { from, subject, emailSender } = await getEmailData(emailId, emailDate);

    downloadEmail(emailCode + '.html', async function (html: string): Promise<void> {
        const key: string = process.env.SecretAccessKey as string;
        const { iv, ciphertext } = await encode(key, email);
        const htmlMarked = html + "<p>Sender tracker: iv=" + iv + ', ciphertext=' + ciphertext + ", cipher=aes256</p>";

        const error = sendEmail(
            from,
            email,
            subject,
            '',//text
            htmlMarked,
            async (error, result): Promise<void> => {
                if (error) {
                    res.json({
                        ok: false
                    })
                } else {
                    res.json({ ok: true })
                }
            })
    })
})

*/



export default router;

