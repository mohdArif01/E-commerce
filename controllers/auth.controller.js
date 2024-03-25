const userModels = require("../models/user.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = require("../config/auth.config")

/**
 * Creating signup api
 */
exports.signup = async (req, res)=>{
    // Reading the request
    const reqObj = req.body
    console.log(reqObj)

    // Insering the data in user collection in MongoDB
    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password),
        email : req.body.email,
        userType : req.body.userType,
        phone : req.body.phone
    }
    try{
        // Creating the user
        const userCreated = await userModels.create(userObj)

        // Returning the user
        const resObj = {
            name : userCreated.name,
            userId : userCreated.userId,
            password : userCreated.password,
            email : userCreated.email,
            userType : userCreated.userType,
            phone : userCreated.phone
        }
        res.status(201).send(resObj)
        console.log("User user created")
    }
    catch(err){
        res.status(500).send({ // 500 for internal server error
            message: ("Error while registering the user")
        })
    }
}

exports.signin = async (req, res)=>{
    // Reading the request
    const user = await userModels.findOne({email : req.body.email})
    //  Checking if the user is already present
    if (user == null){
        return res.status(400).send({
            message : ("User is not registered")
        })
    }

    const isPasswordValid = bcrypt.compare(user.password, req.body.password)
    if (!isPasswordValid){
        return res.status(401).send({
            message : ("Invalid password")
        })
    }

    // Using JWT tokens
    const token = jwt.sign({id : user.userId}, secret.secret,{
        expiresIn : 120
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        phone : user.phone,
        accessToken : token
    })
}