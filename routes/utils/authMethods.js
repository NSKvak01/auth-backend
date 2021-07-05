const {isEmpty, isStrongPassword, isEmail, isAlpha} = require("validator")
// here we need validator methods that we need to use

// we check password, email format, username and name using validators, and then export these functions that return true or false values
const checkIsEmpty = (target) => isEmpty(target)

const checkIsStrongPassword = (password) => isStrongPassword(password)

const checkIsEmail = (email) => isEmail(email)

const checkIsAlpha = (target) => isAlpha(target)
    
const checkIsAlphanumeric = (target) => isAlpha(target)

module.exports = {
    checkIsEmpty,
    checkIsStrongPassword,
    checkIsEmail,
    checkIsAlpha,
    checkIsAlphanumeric
}