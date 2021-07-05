// we bring everything we need for usual router: express, router 
const express = require("express");
const router = express.Router();
// also bring jwtMiddleware to check if we are allowed to use twilio
const jwtMiddleware = require("../utils/jwtMiddleWare")

// we bring twilio account sid and twilio auth token from .env 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// we bring twilio
const client = require("twilio")(accountSid, authToken);
console.log(accountSid, authToken)
// then we create post request using jwtMiddleware and client.messages
router.post("/send", jwtMiddleware, (req, res) => {
    client.messages
        .create({
            body: req.body.message,
            from: "+16514725167",
            to: "+16469456249",
        })
        .then((message) => res.json(message))
        // we also catch errors we something won't work
        .catch((error) => {
        console.log(error.message);
        res.status(error.status).json({ message: error.message, error });
    });
});
module.exports = router;