const express = require("express");
const adminUsersController = require("../controllers/adminUsersController");
const adminContactsController = require("../controllers/adminContactsController");

const adminRoute = express.Router();
adminRoute.route("/users").get(adminUsersController.allUsers);
adminRoute.route("/sellers").get(adminUsersController.allSellers);
adminRoute.route("/customers").get(adminUsersController.allCustomers);
adminRoute
  .route("/user/:userId")
  .get(adminUsersController.oneUser)
  .patch(adminUsersController.updateUser) // Update user details
  .delete(adminUsersController.deleteUser); // Delete a user

// contacts
adminRoute.route("/contacts").get(adminContactsController.allContacts);
adminRoute.route("/contact/:id").delete(adminContactsController.deleteContact);

module.exports = adminRoute;
