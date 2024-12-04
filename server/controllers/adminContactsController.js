const Contact = require("../models/contactModel");
// contacts
const allContacts = async (req, res) => {
  try {
    const response = await Contact.find({});
    if (response) {
      if (response.length === 0)
        res.status(200).json([{ message: "No Data Found !" }]);
      else res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Can not get Data !" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    // Logic to find and delete the user from the database
    const deletedUser = await Contact.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error: error.message });
  }
};
module.exports = { allContacts ,deleteContact};
