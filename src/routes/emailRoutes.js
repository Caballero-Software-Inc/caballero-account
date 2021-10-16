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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var email_1 = require("../channels/email");
var awsDynamoDB_1 = require("../db/awsDynamoDB");
var awsS3_1 = require("../db/awsS3");
var cryptoTools_1 = require("../helpers/cryptoTools");
var router = express_1.default.Router();
router.post('/email/new', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, id, from, subject, html, isValidUser, emailId, emailDate, emailCode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, id = _a.id, from = _a.from, subject = _a.subject, html = _a.html;
                    return [4 /*yield*/, (0, awsDynamoDB_1.validUser)(email, id)];
                case 1:
                    isValidUser = _b.sent();
                    if (isValidUser) {
                        emailId = (0, cryptoTools_1.makeId)(10);
                        emailDate = Date.now();
                        emailCode = emailId + String(emailDate);
                        (0, awsDynamoDB_1.putEmail)({ id: emailId, date: emailDate, email: email, from: from, subject: subject });
                        (0, awsS3_1.uploadEmail)({
                            name: emailCode + '.html',
                            body: html
                        });
                        res.json({ ok: true, emailCode: emailCode });
                    }
                    else {
                        res.json({ ok: false });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/email/send', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, id, emailCode, emailId, emailDate, _b, from, subject, emailSender, error;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, id = _a.id, emailCode = _a.emailCode;
                    emailId = emailCode.substring(0, 10);
                    emailDate = parseInt(emailCode.substring(10, emailCode.length));
                    return [4 /*yield*/, (0, awsDynamoDB_1.getEmailData)(emailId, emailDate)];
                case 1:
                    _b = _c.sent(), from = _b.from, subject = _b.subject, emailSender = _b.emailSender;
                    error = (0, email_1.sendEmail)(from, email, subject, '', //text
                    'Hi', function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (error) {
                                res.json({
                                    ok: false
                                });
                            }
                            else {
                                res.json({ ok: true });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
