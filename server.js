const express = require('express')
const mongoose = require('mongoose')
const serverConfig = require('./config/server.config')
const dbConfig = require('./config/db.config')
const app = express()
const bcrypt = require('bcrypt')
const userModels = require('./models/user.models')


app.use(express.json())

/**
 * Connection with mongoose
 */
mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on("error", ()=>{
    console.log("Error while connection to the database")
})
db.once("open", ()=>{
    console.log("Database connection is established")
    init()
})


/**
 * Creating admin user
 */
async function init(){
    try{
        let user = await userModels.findOne({userId : "admin"})
        if (user){
            console.log("Admin is already registered")
            return
        }
    }
    catch(err){
        console.log("Error while registering the admin")
    }

    try{
        user = await userModels.create({
            name : "Arif",
            userID : "admin",
            password : bcrypt.hashsync("welcomeWorld1"),
            email : "mohdarif1234@gmail.com",
            phone : 1234567892,
            userType : "ADMIN"
        })
        console.log("Admin created", user)
    }
    catch(err){
        console.log("Error while creating the admin user")
    }

}

require("./routes/auth.routes")(app)
/**
 * Starting the server
 */
app.listen(serverConfig.PORT, ()=>{
    console.log("Server Started", serverConfig.PORT)
})