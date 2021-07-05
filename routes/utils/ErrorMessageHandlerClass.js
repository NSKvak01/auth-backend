// we handle error class extended from Error here to import in app.js
class ErrorMessageHandlerClass extends Error {
    constructor(message, statusCode){
        // we bring message and statusCode
        super(message, statusCode)
        // status code will be equal to status code in arguments
        this.statusCode = statusCode
        // we define if it's fail or error depending on whether status code starts with 4 or not
        this.status = `${statusCode}`.startsWith("4") ?"fail":"error"
        // this means that it's human error
        this.isOperational = true
    }
}

module.exports  = ErrorMessageHandlerClass