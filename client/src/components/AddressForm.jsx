import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AddressForm = ({ onSave }) => {
  const [address, setAddress] = useState({ house: "", road: "", category: "Home" });
  const { state } = useAppContext();
  const [isHeartRed, setIsHeartRed] = useState(false); // State to toggle heart color

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validation for required fields
    if (!address.house.trim() || !address.road.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const fullAddress = {
      ...address,
      location: state.location,
      displayAddress: state.location ? `${state.location[0]}, ${state.location[1]}` : "Unknown",
    };

    // Save address using the onSave callback
    onSave(fullAddress);

    // Reset form fields after submission
    setAddress({ house: "", road: "", category: "Home" });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-md">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold">Enter Address Details</h3>
        <div
          className="ml-2 cursor-pointer"
          onClick={() => setIsHeartRed(!isHeartRed)} // Toggle heart state
        >
          {/* {isHeartRed ? (
            <span style={{ fontSize: "24px", color: "red" }}>❤️</span> // Red heart
          ) : (
            <span style={{ fontSize: "12px", textShadow: "0 0 1px gray" }}>
              Make Favourite
            </span> // White heart
          )} */}
        </div>
      </div>
      {/* House/Flat/Block No. Input */}
      <input
        type="text"
        name="house"
        placeholder="House/Flat/Block No."
        value={address.house}
        className="w-full border border-gray-300 p-2 rounded-md mb-4"
        onChange={handleChange}
      />
      {/* Apartment/Road/Area Input */}
      <input
        type="text"
        name="road"
        placeholder="Apartment/Road/Area"
        value={address.road}
        className="w-full border border-gray-300 p-2 rounded-md mb-4"
        onChange={handleChange}
      />
      {/* Category Dropdown */}
      <select
        name="category"
        value={address.category}
        className="w-full border border-gray-300 p-2 rounded-md mb-4"
        onChange={handleChange}
      >
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Friends & Family">Friends & Family</option>
      </select>
      {/* Save Address Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSubmit}
      >
        Save Address
      </button>
    </div>
  );
};

export default AddressForm;
