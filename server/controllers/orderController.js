const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
const mongoose = require("mongoose");

// Create a new order
const createOrder = async (req, res) => {
  // Start a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderData = req.body;
    
    // Generate a unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    orderData.orderNumber = orderNumber;
    
    // Set the user ID from the authenticated user
    orderData.userId = req.userId;
    
    // Create the order
    const newOrder = new Order(orderData);
    await newOrder.save({ session });
    
    // Update stock for each product in the order
    for (const item of orderData.items) {
      const product = await Product.findById(item.productId).session(session);
      
      if (!product) {
        // If product not found, abort transaction
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ 
          message: `Product with ID ${item.productId} not found` 
        });
      }
      
      if (product.stock < item.quantity) {
        // If not enough stock, abort transaction
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        });
      }
      
      // Update stock
      product.stock -= item.quantity;
      
      // Update product status if stock becomes 0
      if (product.stock === 0) {
        product.status = 'out of stock';
      }
      
      // Increment purchases count
      product.purchases += item.quantity;
      
      // Update the product
      await product.save({ session });
    }
    
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder._id.toString(),
      orderNumber: orderNumber
    });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user orders",
      error: error.message
    });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Check if the user is authorized to view this order
    if (order.userId.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message
    });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // If cancelling an order that was not cancelled before, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      // Start a transaction
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        // Restore stock for each product
        for (const item of order.items) {
          const product = await Product.findById(item.productId).session(session);
          
          if (product) {
            // Restore stock
            product.stock += item.quantity;
            
            // Update product status if it was out of stock
            if (product.status === 'out of stock' && product.stock > 0) {
              product.status = 'active';
            }
            
            // Decrement purchases count
            product.purchases -= item.quantity;
            
            // Save the product
            await product.save({ session });
          }
        }
        
        // Update order status
        order.status = status;
        order.updatedAt = Date.now();
        await order.save({ session });
        
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        
        res.status(200).json({
          message: "Order status updated and stock restored",
          orderId: order._id.toString(),
          status: order.status
        });
      } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        session.endSession();
        
        throw error;
      }
    } else {
      // Just update the status
      order.status = status;
      order.updatedAt = Date.now();
      await order.save();
      
      res.status(200).json({
        message: "Order status updated",
        orderId: order._id.toString(),
        status: order.status
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};
