const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.send("This is api/auth route");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

const register = async (req, res) => {
  try {
    const newuser = req.body;
    newuser.email = newuser.email.toLowerCase();
    const userExist = await User.findOne({ email: newuser.email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const createduser = await User.create(newuser);
    res.status(201).json({
      message: "User Created Successfully !",
      userId: createduser._id.toString(),
      token: await createduser.generateToken(),
    });
  } catch (err) {
    const error = {
      status:400,
      message:err
    }
    console.log(error);
    next(error);
    // res.status(400).send({ error: error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    email = email.toLowerCase();
    const userExist = await User.findOne({ email:email});
    if (!userExist) {
     return res.status(401).json({ message: "User Not Found !" });
    }
    const isValidPassword =await userExist.compairPass(password);
    console.log("isValidPassword ",isValidPassword);
    if (isValidPassword) {
      res.status(200).json({
        message: "Logged In Successfully !",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

module.exports = { home, register, login };
