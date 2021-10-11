import dotenv from 'dotenv';
dotenv.config();

import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REGION as string,
    accessKeyId: process.env.AccessKeyID as string,
    secretAccessKey: process.env.SecretAccessKey as string
});

let documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME_USER = "users-caballero";

export async function putUser(user: any): Promise<void> {
    const params = {
        TableName: TABLE_NAME_USER,
        Item: user
    };
    await documentClient.put(params).promise();
}
