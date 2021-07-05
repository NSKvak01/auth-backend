const {checkIsStrongPassword} = require('../../utils/authMethods')
// we bring true or false value from authMethods

// the function bellow checks if the password is strong
function checkIsStrongPasswordFunc (req, res, next){
    // bring errorObj
    let {errorObj} = res.locals
    // get password from body.json
    const {password} = req.body
    // check if the value is false, if yes, store the error message into errorObj and move next
    if (!checkIsStrongPassword(password)){
        errorObj.weakPassword = "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8"
    }

        next()
    
}
// export the function to use in userRouter

module.exports = checkIsStrongPasswordFunc