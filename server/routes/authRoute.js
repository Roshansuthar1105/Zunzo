const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController.js")
const zodSchemas = require("../validators/authValidator.js");
const validator = require("../middlewares/authMiddleware.js");
authRouter.route("/").get(authController.home)
authRouter.route("/register").post(validator(zodSchemas.signUpSchema),authController.register)
authRouter.route("/login").post(validator(zodSchemas.loginSchema),authController.login)

module.exports = authRouter;