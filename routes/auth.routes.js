const authController = require("../controllers/auth.controller")

module.exports = (app)=>{
    app.post("/signup", authController.signup)
    app.post("/signin", authController.signin)
}