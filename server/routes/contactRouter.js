const express = require("express");
const contactController = require("../controllers/contactController.js");
const contactRouter = express.Router();

contactRouter.route("/").post(contactController);

module.exports = contactRouter;