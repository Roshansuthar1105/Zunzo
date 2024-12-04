const User = require("../models/userModel");
const allUsers = async (req, res) => {
  try {
    const response = await User.find({}, { password: 0 });
    if (response) {
      if (response.length === 0)
        res.status(200).json([{ message: "No Data Found !" }]);
      else res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Can not get Data !" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const allSellers = async (req, res) => {
  try {
    const response = await User.find({ role: "seller" }, { password: 0 });
    if (response) {
      if (response.length === 0)
        res.status(200).json([{ message: "No Data Found !" }]);
      else res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Can not get Data !" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const allCustomers = async (req, res) => {
  try {
    const response = await User.find({ role: "customer" }, { password: 0 });
    if (response) {
      if (response.length === 0)
        res.status(200).json([{ message: "No Data Found !" }]);
      else res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Can not get Data !" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const oneUser = async (req, res) => {
    const { userId } = req.params;
    console.log("id : ", userId);
    try {
        const response = await User.find({ _id: userId }, { password: 0 });
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(400).json({ message: "Can not get Data !" });
    }
} catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
}
};
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    // Logic to find and update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true});
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Logic to find and delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};
module.exports = { allUsers, oneUser, allSellers, allCustomers , updateUser , deleteUser};
