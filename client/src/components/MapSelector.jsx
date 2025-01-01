import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MapSelector = ({ onConfirmLocation }) => {
  const { state, dispatch } = useAppContext();
  const [location, setLocation] = useState(state.location || [51.505, -0.09]); // Default location: London
  const [manualSearch, setManualSearch] = useState(""); // Manual search input
  const [address, setAddress] = useState(""); // Selected address display
  const mapRef = useRef(null); // Reference to control the map
  const navigate = useNavigate(); // React Router navigation

  // Fetch address based on coordinates
  const fetchAddress = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress("Unknown location");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Unable to fetch address");
    }
  };

  // Update address when the location changes
  useEffect(() => {
    fetchAddress(location[0], location[1]);
  }, [location]);

  // Allow fine-tuning of the location by clicking on the map
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const newLocation = [lat, lng];
        setLocation(newLocation);
        dispatch({ type: "SET_LOCATION", payload: newLocation });
      },
    });
    return null;
  };

  // Handle manual search for a location
  const handleManualSearch = async () => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${manualSearch}`;
    try {
      const response = await fetch(url);
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        const newLocation = [parseFloat(lat), parseFloat(lon)];
        setLocation(newLocation);
        dispatch({ type: "SET_LOCATION", payload: newLocation });

        // Center the map
        if (mapRef.current) {
          mapRef.current.setView(newLocation, 13);
        }
      } else {
        alert("Location not found. Please try a different query.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while searching for the location.");
    }
  };

  const handleConfirm = () => {
    // Save the location and address in state
    dispatch({ type: "SET_LOCATION", payload: location });

    // Navigate to the address page and pass the location data
    navigate("/address", { state: { location, address } });
  };

  return (
    <div className="relative p-4">
      {/* Manual Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a location"
          value={manualSearch}
          onChange={(e) => setManualSearch(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md mb-2"
        />
        <button
          onClick={handleManualSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={location}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance; // Save the map instance
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={location}></Marker>
        <MapEvents />
      </MapContainer>

      {/* Selected Address Display */}
      <div className="mt-4 p-4 bg-gray-100 shadow-md rounded-md">
        <h3 className="text-lg font-bold mb-2">Selected Address:</h3>
        <p className="text-gray-600">{address}</p>
      </div>

      {/* Confirm Location Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleConfirm}
      >
        Confirm Location
      </button>
    </div>
  );
};

export default MapSelector;
