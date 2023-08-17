const CryptoJS  = require('crypto-js');
const secretKey = `5ot2PmZkhlJPXxIoMP67uGoEsZutqfFIUiadXd8gbMn6r4uBo8`;

const encrypt = (data) => {
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
}


export default encrypt;