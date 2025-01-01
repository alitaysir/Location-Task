import addressModel from "../models/addressModel.js";

// Save Address
export const saveAddress = async (req, res) => {
  try {
    const { house, road, category, location, displayAddress, userId } = req.body;

    if (!house || !road || !category || !location || !displayAddress) {
      return res.json({ success: false, message: "Missing details" });
    }

    const newAddress = new addressModel({
      userId,
      house,
      road,
      category,
      location,
      displayAddress,
    });

    await newAddress.save();

    res.json({ success: true, message: "Address saved successfully" });
  } catch (error) {
    console.error("Save Address Error: ", error);
    res.json({ success: false, message: error.message });
  }
};

// Get User's Saved Addresses
export const getSavedAddresses = async (req, res) => {
  try {
    const { userId } = req.body;

    const addresses = await addressModel.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.error("Get Addresses Error: ", error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body; // Ensure both userId and addressId are provided

    if (!userId || !addressId) {
      return res.status(400).json({ success: false, message: "Missing required parameters" });
    }

    // Delete the address by ID
    const deletedAddress = await addressModel.findOneAndDelete({ _id: addressId, userId });

    if (!deletedAddress) {
      return res.status(404).json({ success: false, message: "Address not found or user not authorized" });
    }

    // Fetch the updated list of addresses
    const updatedAddresses = await addressModel.find({ userId });

    res.json({ success: true, message: "Address deleted successfully", updatedAddresses });
  } catch (error) {
    console.error("Delete Address Error: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
