'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/*

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
exports.default = router;
