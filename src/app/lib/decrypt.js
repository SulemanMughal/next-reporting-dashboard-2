import CryptoJS from 'crypto-js';

const secretKey = 'secret key 123';


const decrypt = (encryptedData) => {
    let bytes   = CryptoJS.AES.decrypt(encryptedData, secretKey)
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

export default decrypt;

