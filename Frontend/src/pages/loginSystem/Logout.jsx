import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  const handleDelete = async () => {
    // Your delete logic here
    if (sessionStorage.getItem("username")) {
      sessionStorage.removeItem("username");
      console.log('Logout');
      navigate("/");
    }
  };

  const handleCancel = async() => {

  }

  return (
    //
    <div className="relative">
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDelete}
          className="text-[16px] bg-red-500 py-1 px-8 rounded-md mt-2 text-white font-bold"
        >
          Logout
        </button>
        <button
          onClick={handleCancel}
          className="text-[16px] bg-gray-500 py-1 px-8 rounded-md mt-2 text-white font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Logout;
