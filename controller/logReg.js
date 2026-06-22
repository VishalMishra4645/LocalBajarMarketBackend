// const { default: registerModel } = require("../model/logReg");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.getHome = (req, res) => {
//   try {
//     res.status(200).send("Hello Coders");
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.getRegister = (req, res) => {
//   try {
//     res.status(200).send("Welcome to SignIn Up");
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.postRegister = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     const userExist = await registerModel.findOne({ email: email });

//     if (userExist) {
//       res.status(400).json({ message: "User already exist" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//   } catch (error) {
//     res.status(404).send({ message: "Internal server error " });
//   }
// };

// exports.postLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userExist = await registerModel.findOne({ email });

//     if (!userExist) {
//       return res.status(400).json({ message: "User Not Found" });
//     }

//     const isMatch = await bcrypt.compare(password, userExist.password);

//     // ❌ FIXED LOGIC
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     // 🔥 TOKEN CREATE PROPER WAY
//     const token = jwt.sign(
//       {
//         id: userExist._id,
//         email: userExist.email,
//         name: userExist.name
//       },
//       process.env.NEW_TOKEN,
//       { expiresIn: "1d" }
//     );

//     return res.status(200).json({
//       message: "Login Successfull",
//       token,
//       user: {
//         id: userExist._id.toString(),
//         name: userExist.name,
//         email: userExist.email
//       }
//     });

//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
