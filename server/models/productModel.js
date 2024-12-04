const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: { type: [Object] },
    colors: { type: [String] },
    size: { type: [String] },
    quantity: { type: [Number] },
    sellerid: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String] },
    images: { type: [String], required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    sku: { type: String, unique: true, required: true },
    status: { type: String, enum: ['active', 'inactive', 'out of stock'], default: 'active' },
    weight: { type: Number },
    dimensions: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    shippingInfo: { type: String },
    returnPolicy: { type: String },
    brand: { type: String },
});

const Product= mongoose.model("Product",productSchema);
module.exports = Product;