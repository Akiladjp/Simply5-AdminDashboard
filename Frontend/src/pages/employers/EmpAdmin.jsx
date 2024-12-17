import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeCard from "../../components/EmployeeCard";

function EmpAdmin() {
  const [employees, setEmployees] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch employees data
  const fetchEmployees = () => {
    axios
      .get(`${API_URL}/employeecard/`,{withCredentials:true})
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

  const handleRemoveAdminClick = async (employee) => {
    try {
      const response = await axios.put("http://localhost:8081/remove-admin", {
        withCredentials:true,
        empID: employee.empID,
      });
  
      if (response.status === 200) {
        fetchEmployees(); // Refresh employee list after admin is removed
      }
    } catch (error) {
      console.error("Error removing admin:", error);
      alert("Failed to remove admin.");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start overflow-auto">
        {/* Main content area */}
        <div className="translate-x-0 opacity-100 flex flex-wrap items-center relative justify-center mt-2 ml-10 mr-12 top-4 p-4">
          <div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-8">
            
            {/* Employee Cards - Show only admins */}
            {employees
              .filter((employee) => employee.isAdmin) // Filter to show only admin employees
              .map((employee, index) => (
                <EmployeeCard key={index} data={employee} onAdminClick={() => handleAdminClick(employee)}
                onRemoveAdminClick={() => handleRemoveAdminClick(employee)}/>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmpAdmin;