/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  //axios.defaults.withCredentials = true;

  const handleDelete = async () => {
     console.log("inside delete");

   if(sessionStorage.getItem("username")){
    sessionStorage.removeItem('username');
    console.log("logoutSuccsfull",sessionStorage.getItem("username"))
    navigate('/')
   }
  }
    //   try {
    //     // Make a request to the server to logout
    //     const response = await axios.post("http://localhost:8081/adminlogout");

    //     if (response.data.success) {
    //       // Clear any local user data or state
    //       // For example, if using React state management like Redux or Context API, dispatch a logout action
    //       // localStorage.removeItem('userData'); // Clear user data from localStorage
    //       // setState({ user: null }); // Set user state to null

    //       // Redirect to the login page or any other desired page
    //       navigate("/");
    //     } else {
    //       console.error("Logout failed");
    //     }
    //   } catch (error) {
    //     console.error("Error during logout:", error);
    //   }
    // };

    return (
      <>
        <div className="flex justify-center py-48">
          <div className="h-[220px] p-10 rounded-2xl shadow-2xl shadow-blue-200 border-blue-200 border-2 md:h-auto items-center flex flex-col">
            <h2 className="text-[rgb(0,127,168)] font-semibold text-xl lg:text-3xl mb-10">
              Are you sure?
            </h2>
            <button
              className="bg-[rgb(0,127,168)] px-4 py-1.5 border-none text-white  font-semibold lg:text-xl "
              onClick={handleDelete}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  
}
export default Logout;
