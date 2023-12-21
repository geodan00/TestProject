
var SHA256 = require("crypto-js/sha256");

const Hash = (plainText : string) : string => {
    return SHA256(plainText)+"";
};
export default Hash;