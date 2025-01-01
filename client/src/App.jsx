import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressPage from "./pages/AddressPage"; // Adjust the path as necessary
import ListAddress from "./pages/ListAddress";
import Success from "./pages/Success";

const AppContent = () => {
  const { user } = useAppContext(); // Now context is available

  return (
    <>
      <ToastContainer position="bottom-right" />
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route path="/" element={user ? <HomePage /> : <Signup />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/address-manage" element={<ListAddress/>} />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
