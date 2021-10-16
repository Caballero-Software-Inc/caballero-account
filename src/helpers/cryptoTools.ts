export function makeId(length: number): string {
    const crypto = require('crypto');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const result = [...Array(length)]
        .map(value => characters.charAt(crypto.randomInt(charactersLength)))
        .join('');
    return result;
}

/*
export async function hash(s: string): Promise<string> {
    const {
        createHash
    } = await import('crypto');

    const hash = createHash('sha256');
    hash.update(s);

    return hash.digest('hex');
}
*/

/*
export async function encode(key: string, text: string): Promise<{ iv: string; ciphertext: string; }> {
    const {
        createCipheriv, randomBytes, createHash
    } = await import('crypto');
    const algorithm = 'aes256';
    const iv = randomBytes(16);
    const validKey = createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
    const cipher = createCipheriv(algorithm, validKey, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('base64'), ciphertext: encrypted.toString('base64') };
}
*/

/*
const decode = async (key, ciphertextBase64, ivBase64) => {
    const {
        createDecipheriv, createHash
    } = await import('crypto');
    ciphertext = Buffer.from(ciphertextBase64, 'base64');
    iv = Buffer.from(ivBase64, 'base64');
    const algorithm = 'aes256';
    const validKey = createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
    const decipher = createDecipheriv(algorithm, validKey, iv);
    let decrypted = decipher.update(ciphertext);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString()
}

const { encode, decode } = require('./cryptoTools');

encode('abc', 'xyz')
    .then(jsonCode => {
        console.log(jsonCode);
        const { iv, ciphertext } = jsonCode;
        decode('abc', ciphertext, iv)
            .then(decoded => console.log(decoded))
    })
*/



