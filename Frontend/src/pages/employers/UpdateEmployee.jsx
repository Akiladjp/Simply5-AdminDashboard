import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { FaPhone } from "react-icons/fa6";
import { MdCake } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";

function UpdateEmployee() {
  const navigate = useNavigate();
  const { empID } = useParams();
  const [preemployees, setpreEmployees] = useState([""]);
  const [data, setData] = useState({
    name: "",
    position: "",
    phoneNo: "",
    NIC: "",
    birthDate: "",
    joinedDate: "",
    address: "",
    image: "",
  });

  const [birthDateType, setBirthDateType] = useState("text");
  const [joinedDateType, setJoinedDateType] = useState("text");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/updateEmployee/${empID}`
        );

        // Check if the data is valid before setting the state
        if (response.data.preemployees) {
          setData({
            name: response.data.preemployees[0].name || "",
            position: response.data.preemployees[0].position || "",
            phoneNo: response.data.preemployees[0].phoneNo || "",
            NIC: response.data.preemployees[0].NIC || "",
            birthDate: response.data.preemployees[0].birthDate || "",
            joinedDate: response.data.preemployees[0].joinedDate || "",
            address: response.data.preemployees[0].address || "",
            image: response.data.preemployees[0].image_url || "",
          });
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    console.log(data);

    // Ensure empID is defined before making the request
    fetchEmployeeData();
  }, [empID]);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.put(
        `http://localhost:8081/updateEmployee/${empID}`,
        data
      );
  
      if (res.data.message === "success") {
        alert("Update Successful");
        navigate("/app/employers/employee");
      } else {
        alert(`Error: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred while updating the employee. Please try again.");
    }
  };
  

  const handleBirthDateFocus = () => setBirthDateType("date");
  const handleBirthDateBlur = () => {
    if (!data.birthDate) {
      setBirthDateType("text");
    } else {
      setBirthDateType("date");
    }
  };

  const handleJoinedDateFocus = () => setJoinedDateType("date");
  const handleJoinedDateBlur = () => {
    if (!data.joinedDate) {
      setJoinedDateType("text");
    } else {
      setJoinedDateType("date");
    }
  };
  console.log(data);

  return (
    <div className="flex justify-center w-full p-1 mt-1 rounded-xl">
      <form onSubmit={handleSubmit} className="lg:w-[35%] md:w-3/5">
        <div>
          <div className="flex justify-center w-full mb-5">
            {/* <label className="flex flex-col items-center justify-center order-2 lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-20 sm:h-20 w-20 h-20 p-2 md:mt-8 md:mb-8 lg:mt-10 lg:mb-10 mt-6 mb-6 bg-white shadow-md rounded-full cursor-pointer shadow-[rgb(81,191,228)]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                <svg
                  className="w-3 h-3 lg:w-5 lg:h-5 md:w-4 md:h-4 mx-auto text-[rgb(81,191,228)]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    
                  />
                </svg>
              </div>
            </label> */}
          </div>
        </div>

        {/* ============================== */}
        <div className="w-40 h-40 my-16 bg-red-100">
          <img src={data.image} alt={`${data.name} profile`} />
        </div>
        {/* =============================== */}
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="">
            <MdDriveFileRenameOutline size="1.0rem" />
          </label>
          <input
            type="text"
            placeholder="  Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="">
            <FaUserGroup size="1.0rem" />
          </label>
          <input
            type="text"
            placeholder="  Position"
            name="position"
            value={data.position}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="">
            <FaPhone size="1.0rem" />
          </label>
          <input
            type="number"
            placeholder="  Phone Number"
            name="phoneNo"
            value={data.position}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="">
            <BiSolidUserAccount size="1.0rem" />
          </label>
          <input
            type="text"
            placeholder="  NIC"
            name="NIC"
            value={data.NIC}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="birthDate">
            <MdCake size="1.0rem" />
          </label>
          <input
            type={birthDateType}
            name="birthDate"
            value={data.birthDate}
            placeholder="  Date of birth"
            onFocus={handleBirthDateFocus}
            onBlur={handleBirthDateBlur}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="joinedDate">
            <FaCalendarCheck size="1.0rem" />
          </label>
          <input
            type={joinedDateType}
            name="joinedDate"
            value={data.joinedDate}
            placeholder="  Joined Date"
            onFocus={handleJoinedDateFocus}
            onBlur={handleJoinedDateBlur}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
          <label className="p-2 text-[#027297]" htmlFor="">
            <FaAddressCard size="1.0rem" />
          </label>
          <input
            type="text"
            placeholder="  Address"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center gap-8 p-5 lg:gap-16 md:gap-12 lg:mt-8">
          <button
            type="button"
            className="flex w-1/3 justify-center rounded-none bg-white border-[rgb(0,127,168)] border-[2px] px-1 py-1.5 text-sm font-semibold leading-6 text-[rgb(0,127,168)] shadow-sm"
          >
            DELETE
          </button>
          <button
            type="submit"
            className="flex w-1/3 justify-center rounded-none bg-[rgb(0,127,168)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(81,191,228)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(81,191,228)]"
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmployee;
