const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to authenticate user
const authGuard = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authentication required. No token provided." });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Authentication required. No token provided." });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Check if user exists
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: "User not found or token is invalid" });
    }
    
    // Add user info to request
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;
    req.isAdmin = decoded.isAdmin;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    console.error("Auth error:", error);
    res.status(500).json({ message: "Authentication error", error: error.message });
  }
};

// Middleware to check if user is admin
const adminGuard = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
  
  next();
};

// Middleware to check if user is a seller
const sellerGuard = (req, res, next) => {
  if (req.userRole !== 'seller' && !req.isAdmin) {
    return res.status(403).json({ message: "Access denied. Seller privileges required." });
  }
  
  next();
};

module.exports = { authGuard, adminGuard, sellerGuard };
