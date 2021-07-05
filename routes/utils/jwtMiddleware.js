const jwt = require("jsonwebtoken");
// here we bring jwt

async function checkJwtToken(req, res, next) {
    try {
        // if there is headers and authorization, we grab 
        if (req.headers && req.headers.authorization) {
            // we grab token
            let jwtToken = req.headers.authorization.slice(7);
            // we check if jwtToken match stored token
            let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY);
            console.log(decodedJwt);
            // we need to use next to move to other functions
            next();
        } else {
            // throw goes directly to catch block and passes message and statusCode to catch block
            throw { message: "You Don't have permission! ", statusCode: 500 };
        }
        } catch (e) {
            // return next so the code is not broken
            return next(e);
        }
    }
module.exports = checkJwtToken;