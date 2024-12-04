const express = require("express");
const productController = require("../controllers/productController.js");
const productRoute = express.Router();

productRoute.route("/").get(productController.allProducts);
productRoute.route("/add").post(productController.addProduct);
productRoute
  .route("/product/:id")
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRoute;
