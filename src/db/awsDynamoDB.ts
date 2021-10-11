import dotenv from 'dotenv';
dotenv.config();

import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey
});

let documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME_USER = "users-caballero";

export async function putUser(user: any) {
    const params = {
        TableName: TABLE_NAME_USER,
        Item: user
    };
    return await documentClient.put(params).promise();
}
