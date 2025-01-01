import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import axios from "axios"; // Import Axios for API calls
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddressPage = () => {
  const { state } = useLocation(); // Access location and address passed via state
  const navigate = useNavigate();
  const { token } = useAppContext(); // Get token from context

  if (!state || !state.location) {
    // Redirect back to the home page if no location data is available
    navigate("/success");
    return null;
  }

  const handleSaveAddress = async (address) => {
    try {
      const payload = {
        ...address,
        location: state.location, // Pass latitude and longitude
        displayAddress: state.address, // Display address from state
      };

      const res = await axios.post("https://location-task.onrender.com//api/user/address/save", payload, {
        headers: { token }, // Include the user's token for authentication
      });

      if (res.data.success) {
        toast.success("Address saved successfully!");
        navigate("/success"); // Redirect to the home page or another appropriate page
      } else {
        alert(res.data.message || "Failed to save the address.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast("An error occurred while saving the address. Please try again.");
    }
  };

  return (
    <div className="px-4 pt-10">
      <h3 className="text-lg font-bold mb-4">Selected Address:</h3>
      <p className="text-gray-600 mb-4">{state.address}</p>
      <AddressForm onSave={handleSaveAddress} />
    </div>
  );
};

export default AddressPage;
