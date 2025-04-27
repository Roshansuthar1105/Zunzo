const express = require("express");
const orderController = require("../controllers/orderController");
const { authGuard, adminGuard } = require("../middlewares/authGuard");

const orderRoute = express.Router();

// Create a new order (requires authentication)
orderRoute.route("/")
  .post(authGuard, orderController.createOrder);

// Get all orders (admin only)
orderRoute.route("/all")
  .get(authGuard, adminGuard, orderController.getAllOrders);

// Get orders for the authenticated user
orderRoute.route("/my-orders")
  .get(authGuard, orderController.getUserOrders);

// Get, update specific order
orderRoute.route("/:orderId")
  .get(authGuard, orderController.getOrderById)
  .patch(authGuard, adminGuard, orderController.updateOrderStatus);

module.exports = orderRoute;
