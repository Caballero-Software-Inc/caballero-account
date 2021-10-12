'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var email_1 = require("../channels/email");
var awsDynamoDB_1 = require("../db/awsDynamoDB");
var cryptoTools_1 = require("../helpers/cryptoTools");
var languageTools_1 = require("../helpers/languageTools");
var router = express_1.default.Router();
//Before registration, it is important to check that the user has access to this email
router.get('/account/preregister', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, lang, isInexistingPreUser, isInexistingUser, id_1, from, subject, body, html, error;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.query.email;
                    lang = req.query.lang;
                    if (!(email === '')) return [3 /*break*/, 1];
                    res.json({
                        ok: false,
                        error: (0, languageTools_1.l)({
                            "en": "You must write your email address.",
                            "fr": "Vous devez écrire votre adresse électronique."
                        }, lang)
                    });
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, (0, awsDynamoDB_1.inexistingPreUser)(email)];
                case 2:
                    isInexistingPreUser = _a.sent();
                    if (!isInexistingPreUser) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, awsDynamoDB_1.inexistingUser)(email)];
                case 3:
                    isInexistingUser = _a.sent();
                    if (isInexistingUser) {
                        id_1 = (0, cryptoTools_1.makeId)(50);
                        from = '"Caballero Software Inc." <caballerosoftwareinc@gmail.com>';
                        subject = (0, languageTools_1.l)({
                            "en": "Identifier",
                            "fr": "Identifiant"
                        }, lang) + " (Caballero Software Inc.)";
                        body = (0, languageTools_1.l)({
                            "en": "Your identifier for Caballero Software Inc. is: ",
                            "fr": "Votre identifiant pour Caballero Software Inc. est : "
                        }, lang)
                            + id_1;
                        html = "<p>" + body + "</p>";
                        error = (0, email_1.sendEmail)(from, email, subject, body, html, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (error) {
                                    res.json({
                                        ok: false,
                                        error: (0, languageTools_1.l)({
                                            "en": "Unable to send an email to: " + email,
                                            "fr": "Impossible d'envoyer un courriel à : " + email
                                        }, lang)
                                    });
                                }
                                else {
                                    (0, awsDynamoDB_1.putPreUser)({ email: email, id: id_1, date: Date.now });
                                    res.json({ ok: true });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                    }
                    else {
                        res.json({
                            ok: false,
                            error: (0, languageTools_1.l)({
                                "en": "This email address already exists.",
                                "fr": "Cette adresse électronique existe déja."
                            }, lang)
                        });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    res.json({
                        ok: false,
                        error: (0, languageTools_1.l)({
                            "en": "An email with the identifier has already been sent to this email address. If there is any problem. Do not hesitate to contact Caballero Software directly.",
                            "fr": "Un courrier électronique avec l'identifiant a déjà été envoyé à cette adresse e-mail. S'il y a un problème. N'hésitez pas à contacter directement Caballero Software."
                        }, lang)
                    });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
});
router.get('/account/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, id, lang, isValidUser, isValidPreUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.query.email;
                    id = req.query.id;
                    lang = req.query.lang;
                    return [4 /*yield*/, (0, awsDynamoDB_1.validUser)(email, id)];
                case 1:
                    isValidUser = _a.sent();
                    if (!isValidUser) return [3 /*break*/, 2];
                    res.json({ ok: true });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, awsDynamoDB_1.validPreUser)(email, id)];
                case 3:
                    isValidPreUser = _a.sent();
                    if (isValidPreUser) {
                        (0, awsDynamoDB_1.putUser)({ email: email, id: id, credits: 0 });
                        (0, awsDynamoDB_1.deletePreUser)(email, id);
                        res.json({ ok: true });
                    }
                    else {
                        res.json({
                            ok: false,
                            error: (0, languageTools_1.l)({
                                "en": "The identifier provided does not correspond to any previously registered user.",
                                "fr": "L'identifiant fourni ne correspond à aucun utilisateur préalablement enregistré."
                            }, lang)
                        });
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
