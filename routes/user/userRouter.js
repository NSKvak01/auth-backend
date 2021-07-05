const express = require("express");
const router = express.Router();
// here we bring express router
const { signup, login } = require("./controller/userController");
// we bring signup and login functions
const checkIsUndefined = require("./helpers/checkIsUndefined");
// we bring checkIsUndefined function 
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
// bring checkIsEmpty function
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");
const {
    checkIsEmailFunc,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");
// and all other functions from authMiddleware

// here we create post request, and first we check if json is undefined, then if it's empty, then check first and last names' format, username format, email format, and if the password is strong and then bring signup that will check all the accumulated errors and save user to database if everything is alright
router.post(
    "/sign-up",
    checkIsUndefined,
    checkIsEmptyFunc,
    checkIsAlphaFunc,
    checkIsAlphanumericFunc,
    checkIsEmailFunc,
    checkIsStrongPasswordFunc,
    signup
);

// we create post request and check if json is undefined, has empty string values, if the email is in the right format, and then login, that checks all previous functions and then log user in
router.post("/login", checkIsUndefined, checkIsEmptyFunc, checkIsEmailFunc, login)
module.exports = router;