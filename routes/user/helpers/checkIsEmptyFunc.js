const {checkIsEmpty} = require("../../utils/authMethods")
// we bring chekcIsEmpty to get true or false value

// in the function bellow, we check if there are empty strings
function checkIsEmptyFunc(req,res,next){
    // bring errorObj from checkIsUndefined
    let {errorObj} = res.locals
    // we store json from body to variable
    let incomingData = req.body
    // then go through keys to check each key value and store errors into errorObj
    for(let key in incomingData){
        if(checkIsEmpty(incomingData[key])){
            errorObj[key] = `${key} cannot be empty`
        }
        // if errorObj has keys, we show the error message, if not, we move next
    } if (Object.keys(errorObj).length > 0) {
        return res.status(500).json({ message: "failure", payload: errorObj });
    } else {
        next()
    }
}
// import the function to use in userRouter
module.exports = checkIsEmptyFunc