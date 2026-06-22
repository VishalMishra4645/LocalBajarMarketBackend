const mongoose = require("mongoose")

const LogRegSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    confirmPassword : { type: String, required: true }
}) 

const registerModel = mongoose.model("Register", LogRegSchema)

export default registerModel;