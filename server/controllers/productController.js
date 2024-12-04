const Product = require("../models/productModel.js")

const allProducts = async (req,res)=>{
    try {
        const resp = await Product.find({});
        if(resp.length===0){
            res.status(200).json([{"message":"No Products found !"}]);
        }
    if(resp){
        res.status(200).json(resp);
    }else{
        res.status(400).json({"message":"Internal server error"});
    }
    
    } catch (error) {
        res.status(500).json({"message":"Some error occures","error":error.message})    
    }
}
const addProduct = async (req,res)=>{
    try {
        const data = req.body;
        const newProduct = await Product.create(data);
        res.status(201).json({"message":"Product created ","id":newProduct._id.toString(),"name":newProduct.name});
    } catch (error) {
        res.status(500).json({"message":"Some error occures","error":error.message})
    }
}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      // Logic to find and update the user in the database
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true});
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Failed to update Product", error: error.message });
    }
  };
  
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      // Logic to find and delete the user from the database
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Product", error: error.message });
    }
  };
  const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
      // Logic to find and delete the user from the database
      const findProduct = await Product.find({_id:id});
      if (!findProduct.length) {
        return res.status(404).json({ message: "Product not found" });
      }else{
          res.status(200).json(findProduct);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to load Product", error: error.message });
    }
  };
module.exports = {allProducts , addProduct ,updateProduct,deleteProduct,getProduct};