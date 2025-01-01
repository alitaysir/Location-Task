import React, { useState } from "react";
import LocationPermissionModal from "../components/LocationPermissionModal";
import MapSelector from "../components/MapSelector";
import { useAppContext } from "../context/AppContext";

const HomePage = () => {
  const [step, setStep] = useState(1);
  const { dispatch } = useAppContext();

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = [latitude, longitude];
        dispatch({ type: "SET_LOCATION", payload: userLocation });
        setStep(3); // Move to map view
      },
      (error) => {
        console.error("Location permission denied:", error);
        alert("Failed to fetch location. Please enable location permissions.");
      }
    );
  };

  const handleManualSearch = () => {
    setStep(3); // Show the MapSelector component
  };

  const handleConfirmLocation = () => {
    alert("Location confirmed!");
    setStep(1); // Reset to initial step
  };

  return (
    <div className="p-4">
      {step === 1 && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onManualSearch={handleManualSearch}
        />
      )}
      {step === 3 && <MapSelector onConfirmLocation={handleConfirmLocation} />}
    </div>
  );
};

export default HomePage;
