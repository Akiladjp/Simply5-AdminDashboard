import axios from "axios";
import React from "react";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function EmployeeCard({ data, onAdminClick, onRemoveAdminClick }) {
  const isAdmin = data.isAdmin === 1;
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/app/employers/admin");
  const API_URL = import.meta.env.VITE_API_URL;
  const ItemDelete = async (id) => {

    console.log('Clicked');

    try {
      const response = await axios.delete(
        `${API_URL}/delete_emp/${id}`
      );
      if (response.data.message.includes("Error")) {
        alert(response.data.message);
      } else {
        window.location.reload(); // Reload after successful deletion
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error; // Handle the error if needed
    }
  };

  return (
    <div className="shadow-lg w-[237px] h-auto shadow-indigo-200 object-cover rounded-xl">
      <div className="flex flex-col w-[237px] h-[194px] pb-2 overflow-hidden bg-white rounded-t-xl">
        <img src={data.image_url} alt={`${data.name}'s profile`} />
      </div>
      <div className="flex flex-col items-start gap-2 p-2 ml-3">
        <h1 className="text-xl font-bold text-wrap">
          {capitalizeFirstLetter(data.name)}
        </h1>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm">{data.position}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm">0{data.phoneNo}</p>
        </div>
        <div className="flex items-center justify-between w-[95%] flex-clip  overflow-hidden">
          {isAdminPage ? (
            <>
              <p
                className="text-sm font-medium w-full cursor-text text-wrap whitespace-normal"
                title={data.email}
              >
                {data.email}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold">Emp.ID : {data.empID}</p>
              <div className="flex items-center w-auto h-auto justify-center gap-x-4">
                <Link to={`/app/employers/updateEmployee/${data.empID}`}>
                  <button className="flex h-auto">
                    <RiEdit2Fill className="text-xl text-black bg-white rounded hover:text-blue-600 hover:scale-2" />
                  </button>
                </Link>
                <button onClick={() => ItemDelete(data.empID)}>
                  <RiDeleteBin5Line className="text-xl text-black bg-white rounded hover:text-red-600" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center my-3 w-full">
          {/* Conditional button based on admin status and page */}
          {isAdmin ? (
            isAdminPage ? (
              <button
                className="mr-3 py-1 px-6 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={onRemoveAdminClick} // Handle admin removal
              >
                Remove
              </button>
            ) : (
              <button
                className="mr-3 py-1 px-8 rounded-lg bg-gray-400 text-white cursor-not-allowed"
                disabled
              >
                Admin
              </button>
            )
          ) : (
            <button
              className="mr-3 py-1 px-8 rounded-lg bg-[#056A8B] hover:bg-[#3698b9] text-white flex justify-center active:scale-95"
              onClick={onAdminClick} // Handle admin promotion
            >
              Make Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
