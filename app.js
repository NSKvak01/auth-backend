// we bring express, logger to check what type of request was made, and app
const express = require ("express")
const logger = require("morgan")
const app = express()
const cors = require("cors")
// we bring error class to use it when the path doesn't not exist
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass")
// we need to bring error controller to manage all the errors in one place
const errorController = require("./routes/utils/errorController")
// bring serRouter to handle signup and login
const userRouter = require('./routes/user/userRouter')
// use to limit the number of times user can try incorrect password
const rateLimit = require("express-rate-limit");
// bring twilio router to be able to send messages
const twilioRouter = require("./routes/twilio/twilioRouter")
app.use(cors())

// we activate logger when in development mode
if (process.env.NODE_ENV === "development"){
    app.use(logger("dev"))
}

// create limiter to set maximum chances of wrong password when logging in, message and window 
const limiter = rateLimit({
    windows: 60 * 60 * 1000, // 15 minutes
    max: 3,
    message:"Too many requests"
});

// we define limiter path
app.use("/api/", limiter);



app.use(express.json())
// then ask express to know how to read json files
// parsing form data
app.use(express.urlencoded({extended:false}))

// establish path to userRouter
app.use('/api/user', userRouter)
// establish twilio router path
app.use('/api/sms', twilioRouter)
// if the path is not defined it will show the following message and 404 status code
app.all("*", function (req,res, next){
    // we create a new error class that contains the info about message and status code 
    next(new ErrorMessageHandlerClass(
        `Cannot find ${res.originalUrl} on this server! Check your URL`, 404
    ))
})

// we need to use error controller to 
app.use(errorController)

// export app to use in server.js
module.exports = app
