function checkIsUndefined(req,res,next){
    // in this function we check if the json is empty/undefined
    if (Object.keys(req.body).length === 0){
        // if yes, we show the error message
        return res.status(500).json({message: "Please fill out the form"})
    } else{
        // if no, create errorObj and store it into res.locals, to use across the app
        let errorObj = {}
        res.locals.errorObj = errorObj
        next()
    }
}
// export this function to use in userRouter

module.exports = checkIsUndefined