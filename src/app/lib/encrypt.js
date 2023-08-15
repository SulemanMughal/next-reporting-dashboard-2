const CryptoJS  = require('crypto-js');
const secretKey = 'secret key 123';

const encrypt = (data) => {
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
}


export default encrypt;