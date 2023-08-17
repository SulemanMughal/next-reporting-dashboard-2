import CryptoJS from 'crypto-js';

const secretKey = `5ot2PmZkhlJPXxIoMP67uGoEsZutqfFIUiadXd8gbMn6r4uBo8`


const decrypt = (encryptedData) => {
    let bytes   = CryptoJS.AES.decrypt(encryptedData, secretKey)
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

export default decrypt;

