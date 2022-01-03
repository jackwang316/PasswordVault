const crypto = require('crypto')
const secret = '7yb4fVCL2gNz5cM24q^wU$ham9yHS*?a'

const encrypt = (unencryptedVal) => {
    const iv = Buffer.from(crypto.randomBytes(16))
    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(secret), iv
    )
    const encryptedVal = Buffer.concat([
        cipher.update(unencryptedVal),
        cipher.final(),
    ]);
    return {
        iv: iv,
        encryptedVal: encryptedVal.toString("hex"),
    };
};

const decrypt = (encryptedVal) => {
    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(secret),
        Buffer.from(encryptedVal.iv, "hex")
    )
    const decryptedVal = Buffer.concat([
        decipher.update(encryptedVal),
        decipher.final(),
    ])

    return decryptedVal.toString()
};

module.exports = {encrypt, decrypt}