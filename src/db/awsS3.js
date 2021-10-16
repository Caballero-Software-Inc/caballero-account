"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadEmail = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var BUCKET_NAME_EMAILS = 'emails-caballero';
var s3_1 = __importDefault(require("aws-sdk/clients/s3"));
var s3 = new s3_1.default({
    region: process.env.REGION,
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey
});
function uploadEmail(_a) {
    var name = _a.name, body = _a.body;
    var params = {
        Bucket: BUCKET_NAME_EMAILS,
        Key: name,
        Body: body
    };
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log("File uploaded successfully. " + data.Location);
    });
}
exports.uploadEmail = uploadEmail;
/*

export async function downloadEmail(name: any, code: (arg0: string) => void): Promise<void> {
    const params = {
        Bucket: BUCKET_NAME_EMAILS,
        Key: name
    };
    s3.getObject(params, function (err, data): void {
        if (err) {
            throw err;
        }
        code(data.Body!.toString('utf-8'));
    });
}

*/ 
