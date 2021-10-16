import dotenv from 'dotenv';
dotenv.config();

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const documentClient = new DocumentClient({
    region: process.env.REGION as string,
    accessKeyId: process.env.AccessKeyID as string,
    secretAccessKey: process.env.SecretAccessKey as string
});

const TABLE_NAME_PRE_USER = "pre-users-caballero";
const TABLE_NAME_USER = "users-caballero";
const TABLE_NAME_EMAIL = "emails-caballero";

export function putPreUser(preUser: any): void {
    const params = {
        TableName: TABLE_NAME_PRE_USER,
        Item: preUser
    };
    documentClient.put(params).promise();
}


export function putUser(user: any): void {
    const params = {
        TableName: TABLE_NAME_USER,
        Item: user
    };
    documentClient.put(params).promise();
}

export function putEmail(user: any): void {
    const params = {
        TableName: TABLE_NAME_EMAIL,
        Item: user
    };
    documentClient.put(params).promise();
}

export async function inexistingUser(email: string): Promise<boolean> {
    const params = {
        ExpressionAttributeNames: {
            "#E": "email"
        },
        ExpressionAttributeValues: {
            ":a":  email
        },
        FilterExpression: "#E = :a",
        ProjectionExpression: "#E",
        TableName: TABLE_NAME_USER
    };
    const myData = await documentClient.scan(params).promise();
    return myData["Count"] === 0
}

export async function inexistingPreUser(email: string): Promise<boolean> {
    const params = {
        ExpressionAttributeNames: {
            "#E": "email"
        },
        ExpressionAttributeValues: {
            ":a":  email
        },
        FilterExpression: "#E = :a",
        ProjectionExpression: "#E",
        TableName: TABLE_NAME_PRE_USER
    };
    const myData = await documentClient.scan(params).promise();
    return myData["Count"] === 0
}


async function getPreUser(email: string, id: string): Promise<any> {
    const params = {
        TableName: TABLE_NAME_PRE_USER,
        Key: {
            id, email
        }
    };
    const myData = await documentClient.get(params, function (err: any, data: any): void {
        if (err)
            console.log(err);
    }).promise();
    return myData;
}

async function getUser(email: string, id: string): Promise<any> {
    const params = {
        TableName: TABLE_NAME_USER,
        Key: {
            id, email
        }
    };
    const myData = await documentClient.get(params, function (err: any, data: any): void {
        if (err)
            console.log(err);
    }).promise();
    return myData;
}

export async function getCredits(email: string, id: string): Promise<number> {
    const params = {
        TableName: TABLE_NAME_USER,
        Key: {
            id, email
        }
    };
    const myData = await documentClient.get(params, function (err: any, data: any): void {
        if (err)
            console.log(err);
    }).promise();
    return myData?.Item?.credits
}

export async function validPreUser(email: string, id: string): Promise<boolean> {
    if ((email === '') || (id === '')) {
        return false;
    } else {
        const myData = await getPreUser(email, id);
        return (Object.keys(myData).length !== 0);
    }
}

export async function validUser(email: string, id: string): Promise<boolean> {
    if ((email === '') || (id === '')) {
        return false;
    } else {
        const myData = await getUser(email, id);
        return (Object.keys(myData).length !== 0);
    }
}

export function deletePreUser(email: string, id: string): void {
    const params = {
        TableName: TABLE_NAME_PRE_USER,
        Key: {
            id, email
        }
    };
    documentClient.delete(params).promise();
}

export function deleteUser(email: string, id: string): void {
    const params = {
        TableName: TABLE_NAME_USER,
        Key: {
            id, email
        }
    };
    documentClient.delete(params).promise(); 
}


export async function getEmailData(id: string, date: number): Promise<any> {
    const params = {
        TableName: TABLE_NAME_EMAIL,
        Key: {
            id, date 
        }
    };
    const myData = await documentClient.get(params, function (err: any, data: any): void {
        if (err)
            console.log(err);
    }).promise();
    return {
        from: myData?.Item?.from,
        subject: myData?.Item?.subject,
        emailSender: myData?.Item?.email
    }
}