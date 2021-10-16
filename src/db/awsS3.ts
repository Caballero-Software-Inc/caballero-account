import dotenv from 'dotenv';
dotenv.config();

const BUCKET_NAME_EMAILS = 'emails-caballero';

import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey
});

const s3 = new AWS.S3({
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey
});


export function uploadEmail({ name, body }:
    { name: string; body: string; }): void {
    const params = {
        Bucket: BUCKET_NAME_EMAILS,
        Key: name,
        Body: body
    };

    s3.upload(params, function (err: any, data: { Location: any; }): void {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}



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