import React from "react";

const LocationPermissionModal = ({ onEnableLocation, onManualSearch }) => {
  return (
    <div className="flex items-center justify-center h-[500px] w-full">
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-md">
      <h3 className="text-lg font-bold mb-2">Location Services</h3>
      <p className="text-gray-600 mb-4 text-center">
        Please select an option to set your delivery location.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        onClick={onEnableLocation}
      >
        Enable Location
      </button>
      <button
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
        onClick={onManualSearch}
      >
        Search Location Manually
      </button>
    </div>
    </div>
  );
};

export default LocationPermissionModal;
