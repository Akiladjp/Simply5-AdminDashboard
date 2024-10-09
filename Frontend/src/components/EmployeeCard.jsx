import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function EmployeeCard({ data }) {
  const [admin, setAdmin] = useState(true);
  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const ItemDelete = async (id) => {
    console.log(id);
    try {
      const respones = await axios.delete(
        `http://localhost:8081/delete_emp/${id}`
      );

      if (respones.data.message == "Error in image deletion") {
        alert("Error in image deletion");
      } else if (
        respones.data.message == "Error in deleting item from database"
      ) {
        alert("Error in deleting Employer from database");
      } else {
        // alert("Item Delete successfuly");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting Employer:", error);
      throw error; // or handle the error as needed
    }
  };
  return (
    <div className="shadow-lg w-[237px] h-auto shadow-indigo-200 object-cover rounded-xl bg">
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
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-semibold">Emp.ID : {data.empID}</p>

          <div className="flex items-center w-auto h-auto justifey-center gap-x-4">
            <Link to={`/app/employers/updateEmployee/${data.empID}`}>
              <button className="flex h-auto">
                <RiEdit2Fill className="text-xl text-black bg-white rounded hover:bg-gray-400 hover:scale-2" />
              </button>
              {/* <DeleteOutlinedIcon/>  */}
            </Link>
            <button
              className=""
              onClick={() => {
                ItemDelete(`${data.empID}`);
              }}
            >
              <RiDeleteBin5Line className="text-xl text-black bg-white rounded hover:bg-gray-400 " />
            </button>
          </div>
        </div>
        <div className={`flex justify-center my-3  w-full`}>
          <button
            className={`${admin  ? "py-1 px-2 rounded-sm bg-[#056A8B] hover:bg-[#3698b9] text-white flex justify-center active:scale-95 " : "py-1 px-2 rounded-sm bg-[#e24327] hover:bg-[#b14431] text-white flex justify-center active:scale-95 " }`}
            onClick={handleAdmin}
          >
            {admin ? "make an admin" : "remove admin"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
