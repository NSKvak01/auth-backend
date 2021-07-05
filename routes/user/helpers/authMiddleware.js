const {
    checkIsEmail,
    checkIsAlpha,
    checkIsAlphanumeric,
} = require("../../utils/authMethods");

// we bring some functions from auth methods to get true or false values to check our inputs

// this function checks email format
function checkIsEmailFunc(req, res, next) {
    // we bring errorObj defined in checkIsUndefined
    let {errorObj} = res.locals
    // the we check if the email is in email format, if not, we add error to erroObj and move next, if no error, we move next to another function
    if (!checkIsEmail(req.body.email)) {
        errorObj.wrongEmailFormat = "Must be in email format!";
    }
    next();
}
// here we check firstName and lastName formats
function checkIsAlphaFunc(req, res, next) {
    // bring errorObj
    let {errorObj} = res.locals

    // store incoming data from body json
    const inComingData = req.body;
    // go through the keys in json and if it matches firstName or lastName, then we check if the format is correct, if not, we add error to errorObj and move next, otherwise just move next
    for (key in inComingData) {
        if (key === "firstName" || key === "lastName") {
        if (!checkIsAlpha(inComingData[key])) {
            errorObj[`${key}`] = `${key} can only have characters`;
        }
        }
    }
    next();
}
// here we check username format
function checkIsAlphanumericFunc(req, res, next) {
    let {errorObj} = res.locals
    // check true or false value, if false, then add error to errorObj, and move next
    if (!checkIsAlphanumeric(req.body.username)) {
        errorObj.usernameError = "username can only have characters and numbers";
    }
    next();
}

// we export these functions to use in userRouter
module.exports = {
    checkIsEmailFunc,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
};