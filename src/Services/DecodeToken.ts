var JWTDecoder  = require("jwt-decoder-claims");

const DecodeToken = (token : string) : string => {
    return JWTDecoder.payload(token);
};
export default DecodeToken;