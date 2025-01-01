import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAppContext();
  const navigate=useNavigate();

  function handlebutton(){
    navigate("/")
  }
  return (
    <div className="w-full px-7 py-3 bg-gray-600 text-white flex items-center justify-between">
      <h1 className="text-2xl font-semibold cursor-pointer" onClick={handlebutton}>Locator-App</h1>
      <div className="flex items-center justify-center gap-5">
        <Link className="text-white" to="/address-manage">
          Address Management
        </Link>
        <button onClick={logout} className="bg-blue-600 rounded px-3 py-1">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
