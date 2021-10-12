'use strict';

import express from "express";

import { sendEmail } from "../channels/email";
import { putPreUser, inexistingUser, inexistingPreUser, validPreUser, putUser, deletePreUser, validUser, deleteUser, getCredits } from "../db/awsDynamoDB";
import { makeId } from "../helpers/cryptoTools";
import { l } from "../helpers/languageTools";


const router = express.Router();

//Before registration, it is important to check that the user has access to this email
router.get('/account/preregister', async function (req: any, res: any): Promise<void> {

    const email = req.query.email as string;
    const lang = req.query.lang as string;

    if (email === '') {
        res.json({
            ok: false,
            error: l({
                "en": "You must write your email address.",
                "fr": "Vous devez écrire votre adresse électronique."
            }, lang)
        })
    } else {
        const isInexistingPreUser = await inexistingPreUser(email);
        if (isInexistingPreUser) {
            const isInexistingUser = await inexistingUser(email);
            if (isInexistingUser) {
                const id = makeId(50);
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
                const html = "<p>" + body + "</p>";
                const error = sendEmail(from, email, subject, body, html, 
                    async (error, result): Promise<void> => {
                        if (error) {
                            res.json({ 
                                ok: false, 
                                error: l({
                                    "en": "Unable to send an email to: " + email,
                                    "fr": "Impossible d'envoyer un courriel à : " + email
                                }, lang)
                            })
                        } else {
                            putPreUser({ email, id, date: Date.now });
                            res.json({ ok: true })
                        }
                    })
            } else {
                res.json({
                    ok: false,
                    error: l({
                        "en": "This email address already exists.",
                        "fr": "Cette adresse électronique existe déja."
                    }, lang)
                })
            }
        } else {
            res.json({
                ok: false,
                error: l({
                    "en": "An email with the identifier has already been sent to this email address. If there is any problem. Do not hesitate to contact Caballero Software directly.",
                    "fr": "Un courrier électronique avec l'identifiant a déjà été envoyé à cette adresse e-mail. S'il y a un problème. N'hésitez pas à contacter directement Caballero Software."
                }, lang)
            })
        }
    }
})

router.get('/account/signin', async function (req: any, res: any): Promise<void> {
    const email = req.query.email;
    const id = req.query.id;
    const lang = req.query.lang as string;

    const isValidUser = await validUser(email, id);

    if (isValidUser) {
        res.json({ ok: true, new: false })
    } else {
        const isValidPreUser = await validPreUser(email, id);
        if (isValidPreUser) {
            putUser({ email, id, credits: 0 });
            deletePreUser(email, id);
            res.json({ ok: true, new: true })
        } else {
            res.json({
                ok: false,
                error: l({
                    "en": "The identifier provided does not correspond to any previously registered user.",
                    "fr": "L'identifiant fourni ne correspond à aucun utilisateur préalablement enregistré."
                }, lang)
            })
        }
    }
})

router.get('/account/del', async function (req: any, res: any): Promise<void> {
    const email = req.query.email;
    const id = req.query.id;

    deleteUser(email, id);
    res.json({ ok: true })
})

router.get('/account/credits', async function (req: any, res: any): Promise<void> {
    const email = req.query.email;
    const id = req.query.id;

    const credits = await getCredits(email, id);
    res.json({ credits })
})


export default router;
