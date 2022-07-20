export default class Encryption{
    static  Encrypt (string){
        const CryptoJS = require("crypto-js");
        const text = CryptoJS.AES.encrypt(string.toString(), "my-key").toString();
        return text.replaceAll("/", "-");
    }
    static  Decrypt (string){
        const CryptoJS = require("crypto-js");
        const text = string.replaceAll("-", "/");
        return CryptoJS.AES.decrypt(text, "my-key").toString(CryptoJS.enc.Utf8);
    }
}
