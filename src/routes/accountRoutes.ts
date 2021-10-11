'use strict';

import express from "express";

//import { sendEmail } from "../channels/email";
//import { putUser } from "../db/awsDynamoDB";
//import { makeId } from "../helpers/cryptoTools";
import { l } from "../helpers/languageTools";


const router = express.Router();

router.get('/account/register', async (req, res): Promise<void> => {

        const email = req.query.email as string;
        const lang = req.query.lang as string;
        
        if (email === '') {
            res.json({
                ok: false,
                error: l({
                    "en": "You must write your email address.",
                    "fr": "Vous devez écrire votre adresse électronique."
                }, lang)
            });
        } else {
            /*
            const id = makeId(50);
            putUser({ email, id, credits: 0 });
            const from = '"Caballero Software Inc." <caballerosoftwareinc@gmail.com>';
            const subject = `${l({
                "en": "Identifier",
                "fr": "Identifiant"
            }, lang)} (Caballero Software Inc.)`;
            const body = l({
                "en": "Your identifier for Caballero Software Inc. is: ",
                "fr": "Votre identifiant pour Caballero Software Inc. est : "
            }, lang)
                + id;
            const html = "<b>" + body + "</b>";
            sendEmail(from, email, subject, body, html);
            */
            res.json({ ok: true });
        }    
})

export default router;
