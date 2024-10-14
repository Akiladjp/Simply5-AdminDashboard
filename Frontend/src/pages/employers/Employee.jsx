import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeCard from "../../components/EmployeeCard";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for confirming admin

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/employeecard/")
      .then((res) => {
        console.log(res.data.employees);
        setEmployees(res.data.employees);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch employee data. Please try again.");
      });
  }, []);

  const handleAdminClick = (employee) => {
    setSelectedEmployee(employee);
    setShowPopup(true);
  };

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8081/employeecard/")
      .then((res) => {
        console.log(res.data.employees);
        setEmployees(res.data.employees);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch employee data. Please try again.");
      });
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePopupConfirm = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true); 
    try {
      const response = await axios.post("http://localhost:8081/make-admin", {
        email,
        empID: selectedEmployee.empID,
      });

      if (response.status === 200) {
        //alert("Admin updated successfully!");
        setShowPopup(false);
        setEmail(""); 
		fetchEmployees();2
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("Failed to update admin.");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupCancel = () => {
    setShowPopup(false); 
    setEmail(""); 
	setEmailError("");
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start overflow-auto">
        {/* Main content area */}
        <div className="translate-x-0 opacity-100 flex flex-wrap items-center relative justify-center mt-2 ml-10 mr-12 top-16 p-4">
          <div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-8">
            {/* Add New Employee Button */}
            <Link to="/app/employers/employeeform">
              <button className="flex flex-col items-center justify-center h-[390px] w-[237px] bg-[rgb(0,127,168,0.15)] border-2 rounded-lg border-dashed border-[#027297] hover:bg-[rgb(0,127,168,0.25)]">
                <div className="flex items-center justify-center h-12 w-12 bg-[#007FA8] opacity-75 rounded-full -z-50">
                  <span className="text-2xl font-bold text-white">+</span>
                </div>
                <p className="mt-2 text-gray-600">Add New Employee</p>
              </button>
            </Link>

            {/* Employee Cards */}
            {employees.map((employee, index) => (
              <EmployeeCard
                key={index}
                data={employee}
                onAdminClick={() => handleAdminClick(employee)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Popup modal */}
      {showPopup && (
        <div className="fixed inset-0 ml-36 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-black text-xl font-medium">
              Enter {selectedEmployee?.name}'s Email
              <span className="text-red-600">*</span>
            </p>
            <input
              type="email"
              placeholder="Enter email"
              className="border-2 mb-1 w-72 py-1 px-2 focus:border-blue-500 outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />
            {emailError && <p className="text-red-600 mb-4">{emailError}</p>}
            <div className="space-x-4">
              <button
                onClick={handlePopupCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupConfirm}
                className={`${
                  loading ? "bg-gray-500" : "bg-green-500"
                } text-white px-4 py-2 rounded-md hover:bg-green-600`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Employee;
