const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");
// we bring error class 

// we define a function for development
function dispatchErrorDevelopment (error,req,res){
    // if url starts with api, we return json containing info about status, error, message and stack
    if(req.originalUrl.startsWith('/api')){
        return res.status(error.statusCode).json({
            status:error.status,
            error:error,
            message:error.message,
            stack:error.stack
        })
    }
}
// define function for production
function dispatchErrorProduction (error,req,res){
    // if url starts with api and error is operational, we only return status and message back to user
    if (req.originalUrl.startWith("/api")){
        if(error.isOperational){
            return res.status(error.statusCode).json({
                status:error.status,
                message:error.message
            })
        }
        // if it's not operational we return "error" and our message we create here
        return res.status(error.statusCode).json({
            status:"Error",
            message:"Something went wrong"
        })
    }

}

// Solution 1
// here is a mongoDB duplicate error handler 
function handleMongoDBDuplicate(err){
    // we take the first object key which is email
    let errorMessageDuplicateKey = Object.keys(err.keyValue)[0]
    // we take the first object value which is email user typed
    let errorMessageDuplicateValue = Object.values(err.keyValue)[0]
    // we make customized message using email - email user typed 
    let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken please choose another one`
    // then return new error we created using error class where we passed message and status code
    return new ErrorMessageHandlerClass(message,400)
}

// Solution 2

// function handleMongoDBDuplicate(err){
//     let errorMessage  = err.message
//     let findOpeningBracket = errorMessage.match(/{/).index
//     let findClosingBracket = errorMessage.match(/}/).index

//     let foundDuplicateValueString = errorMessage.slice(
//         findOpeningBracket +1,
//         findClosingBracket 
//         )
//         let newErrorString = foundDuplicateValueString.replace(/:|\"/g, "")
//         let trimmedNewErrorString = newErrorString.trim()
//         let errorStringArray = trimmedNewErrorString.split(' ')
//         let message = `${errorStringArray[0]} - ${errorStringArray[1]} is taken please choose another one`
//     return new ErrorMessageHandlerClass(message, 400)
// }

// we create err.statusCode to be equal either the original or 500, 
module.exports = (err, req, res, next) =>{
    
    err.statusCode= err.statusCode || 500;
    err.status = err.status || "error"
    
    // we spread the operator to show object without huge message, and save it into the new error object and add err.message. 
    let error  = {...err}
    error.message = err.message
    
    // Then, we check if there is a duplicate MongoDB error code, if yes, we create a new errorMessageHandlerClass
    if (error.code === 11000 || error.code === 11001){
        error = handleMongoDBDuplicate(error)
    }
    // if it's a development error it will use dispatchErorDevelopment function we defined earlier else it will use the function for production
    if(process.env.NODE_ENV === "development"){
        dispatchErrorDevelopment(error, req, res)
    } else{
        dispatchErrorProduction(error, req, res)
    }
}