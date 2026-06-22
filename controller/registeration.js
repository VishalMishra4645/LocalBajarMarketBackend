const bcrypt = require("bcryptjs");
const newRegister = require("../model/register");
const jwt = require("jsonwebtoken");

exports.getHome = (req, res) => {
  try {
    res.status(200).send("Hello Coders");
  } catch (error) {
    console.log(error);
  }
};

exports.getRegister = (req, res) => {
  try {
    res.status(200).send("Welcome to SignIn Up");
  } catch (error) {
    console.log(error);
  }
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await newRegister.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new newRegister({ name, email, password: hashPassword });
    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
      token: process.env.NEW_TOKEN,
      userId: newUser._id.toString(),
    });
  } catch (error) {
    res.status(404).send({
      message: "Internal server error in postRegister " + error.message,
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await newRegister.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send({ message: " invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email , name : user.name },
      process.env.NEW_TOKEN,
      { expiresIn: "1d" } // optional but good practice
    );

    return res.status(200).send({
      message: "Login Successfull",
      token,
      userid: user._id,
      user: { name: user.name, email: user.email},
    });
  } catch (error) {
    return res.status(404).send({ message: "Internal server error " });
  }
};
