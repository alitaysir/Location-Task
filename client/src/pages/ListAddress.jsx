import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const { token } = useAppContext();
  const navigate = useNavigate();

  function handlebutton() {
    navigate("/");
  }

  const deleteaddress = async (addressId) => {
    try {
      const res = await axios.delete(
        `https://location-task.onrender.com//api/user/address/delete`,
        {
          headers: { token }, // Include the user's token for authentication
          data: { addressId }, // Pass addressId in the data property
        }
      );
      if (res.data.success) {
        setAddresses(res.data.updatedAddresses);
        toast.success("Location Deleted successfully")
      } else {
        toast.error("Error Deleting the message")
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("An error occurred while deleting the address. Please try again.");
    }
  };
  
  function handlemove(){
    navigate("/success")
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.post(
          "https://location-task.onrender.com//api/user/address/list",
          {},
          {
            headers: { token }, // Include the user's token for authentication
          }
        );

        if (res.data.success) {
          setAddresses(res.data.addresses);
        } else {
          toast.error("Failed to fetch addresses.");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("An error occurred while fetching addresses. Please try again.");
      }
    };

    fetchAddresses();
  }, [token, addresses]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Your Location</h3>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search your area/pincode/apartment"
          className="flex-grow border border-gray-300 p-2 rounded-md"
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={handlebutton}
        >
          Enable
        </button>
      </div>

      <div>
        <h4 className="text-md font-bold mb-2">Saved Location</h4>
        {addresses.length > 0 ? (
          <ul className="mb-4">
            {addresses.map((address, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2 cursor-pointer"
              >
                <div className="flex items-start">
                  <span className="mr-2">
                    {address.category === "Home" && "🏠"}
                    {address.category === "Office" && "🏢"}
                    {address.category === "Friends & Family" && "👪"}
                  </span>
                  <div>
                    <strong onClick={handlemove}>{address.category}</strong>
                    <p className="text-gray-600 text-sm" onClick={handlemove}>
                      {address.displayAddress}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => deleteaddress(address._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No saved addresses available.</p>
        )}
      </div>

      <div>
        <h4 className="text-md font-bold mb-2">Recent Searches</h4>
        <ul>
          {/* Example recent searches - replace with actual data if available */}
          <li className="flex items-start mb-2 border-b border-gray-200 pb-2">
            <span className="mr-2">📍</span>
            <div>
              <strong>Uppinangady</strong>
              <p className="text-gray-600 text-sm">
                Darul Liba House, Ramanagara, Uppinangady, Puttur Taluk,
                Karnataka, India
              </p>
            </div>
          </li>
          <li className="flex items-start mb-2 border-b border-gray-200 pb-2">
            <span className="mr-2">📍</span>
            <div>
              <strong>Wadala West</strong>
              <p className="text-gray-600 text-sm">
                near Shitala Devi Mandir, Chembur Colony, Chembur, Mumbai,
                Maharashtra, India
              </p>
            </div>
          </li>
          <li className="flex items-start mb-2 border-b border-gray-200 pb-2">
            <span className="mr-2">📍</span>
            <div>
              <strong>Chembur East</strong>
              <p className="text-gray-600 text-sm">
                near Shitala Devi Mandir, Chembur Colony, Chembur, Mumbai,
                Maharashtra, India
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListAddress;
