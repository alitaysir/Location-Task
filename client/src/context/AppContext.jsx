import React, { createContext, useReducer, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AppContext = createContext();

const initialState = {
  location: null, // User's current or selected location
  savedAddresses: [], // Array of saved addresses
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_SAVED_ADDRESSES":
      return { ...state, savedAddresses: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setuser] = useState(null);
  const [token, settoken] = useState(localStorage.getItem("token"));

  const logout=()=>{
    localStorage.setItem("token","")
    setuser(null)
    settoken(null)
  }

  const fetchAddresses = async () => {
    try {
      const res = await axios.post("https://location-task.onrender.com/api/user/address/list", {}, {
        headers: { token },
      });
      if (res.data.success) {
        dispatch({ type: "SET_SAVED_ADDRESSES", payload: res.data.addresses });
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  
  const saveAddress = async (address) => {
    try {
      const res = await axios.post("https://location-task.onrender.com/api/user/address/save", address, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Address saved successfully");
        fetchAddresses();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Could not save address");
    }
  };
  


  return (
    <AppContext.Provider value={{ state, dispatch, user, setuser, token, settoken,logout,fetchAddresses,saveAddress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
