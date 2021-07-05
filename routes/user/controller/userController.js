const bcrypt = require('bcryptjs')
const User = require("../model/User")
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
// here we bring bcrypt to hash password and check password
// we bring model
// jwt to set the logged in status expiration date

// in this function we difinde signup
async function signup(req, res, next){
    // we bring req.body values and store into variables
    const {username, email, password, firstName, lastName} = req.body
    // bring errorObj from res.locals
        let {errorObj} = res.locals
        // check if there are any errors accumulated through the functions before, if yes, it will show the error message, if not, it will go to try section
    if (Object.keys(errorObj).length > 0) {
        return res.status(500).json({ message: "failure", payload: errorObj });
    }
    try {
        // we define salt to brigh gensalt
        let salt = await bcrypt.genSalt(10)
        // the we hash password using the password from json and salt
        let hashedPassword = await bcrypt.hash(password, salt)
        // we create new user and use values from json and hashed password for password
        const createUser = new User ({
            username, 
            firstName, 
            lastName,
            email,
            password:hashedPassword
        })
        // then we save the user in mongoDB
        let savedUser =  await createUser.save()
        // and show success message
        res.json({message:"success - user created"})
    } catch (error) {
        next(error)
        // if there are errors, it will show error messages
        // res.status(500).json({message:"error", error:error.message})
    }
}

// this function is login function
async function login(req, res) {
    const { email, password } = req.body;
    // wi bring email and password from user
    let {errorObj} = res.locals;
    // bring errorObj from res.locals
    // if there are any errors occurred before in previous functions it will show the error by defining the length of errorObj, if no errors, it will go to try block
    if (Object.keys(errorObj).length > 0) {
        return res.status(500).json({ message: "failure", payload: errorObj });
    }
    try {
        // here we check if user exists
        let foundUser = await User.findOne({email:email})
        // if user is null it will show error message to check email and password
        if (!foundUser){
                res.status(400).json({message:"error", payload:"Please check your email and password"})
        } else {
            // if everything is good, it will compare password from database and json
            let comparedPassword = await bcrypt.compare(password, foundUser.password)
            // if comparedPassword is false, it will show the error message
            if(!comparedPassword){
                res.status(400).json({message:"error", payload:"Please check your email and password"})
            } else{
                // if passwords match, it will sign the email and username and set the expiration time and show success message
                let jwtToken = jwt.sign({email:foundUser.email, username:foundUser.username}, 
                    process.env.PRIVATE_JWT_KEY,
                    {
                    expiresIn:"1d"
                    }
                )


                res.json({message:"Success", payload:jwtToken})
            }                    
        } 
    } catch (e) {
        // catch will catch any other errors
        res.json({ message: "error", error: e.message });
    }
}

// need to export signup and login to use in userRouter
module.exports = {signup, login}