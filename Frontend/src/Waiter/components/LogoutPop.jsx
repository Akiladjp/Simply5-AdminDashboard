import React from "react";

export const LogoutPop = ({ handleCancel, handleDelete }) => {
  return (
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
};
