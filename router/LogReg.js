const express = require("express");
const { getHome, postRegister, getRegister, postLogin } = require("../controller/registeration");

const userSignUp = express.Router();

userSignUp.get("/home", getHome)

userSignUp.get("/registration", getRegister)

userSignUp.post("/register", postRegister);

userSignUp.post("/login", postLogin);   

module.exports = userSignUp;