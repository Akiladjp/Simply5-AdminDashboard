import axios from "axios";
import React, { useEffect, useState } from "react";

function EmployeeSummary() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [summaryDetails, setSummary] = useState([]);
  const [OrdersCount, setOrderCount] = useState(0);
  const [MonthOrdersCount, setMonthOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/employeeSummary`);
        if (response.data) {
          setSummary(response.data.EmpDetails);
        } else {
          console.log("No data available");
        }
      } catch (err) {
        console.log("Error in axios:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/OrderCount`);
        if (response) {
          setOrderCount(response.data.count);
        }
      } catch (err) {
        console.log("Error in axios", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/OrderCountMonth`);
        if (response) {
          setMonthOrderCount(response.data.count);
        }
      } catch (err) {
        console.log("Error in axios", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" min-h-auto  mt-8  px-4  h-auto file:after:">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Employee Summary
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {summaryDetails.length > 0 ? (
            summaryDetails.map((employee) => (
              <div
                key={employee.empID}
                className="  bg-[#65c5e64d] shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {employee.name}
                </h2>
                <div className="text-gray-600 mb-4">
                  <p className="flex justify-between">
                    <span>Employee ID:</span>
                    <span>{employee.empID}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Today’s Orders:</span>
                    <span>
                      {OrdersCount[employee.empID]
                        ? OrdersCount[employee.empID]
                        : 0}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Monthly Orders:</span>
                    <span>
                      {MonthOrdersCount[employee.empID]
                        ? MonthOrdersCount[employee.empID]
                        : 0}
                    </span>
                  </p>
                </div>
                <div className="border-t-2 border-gray-500 pt-4 b">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Customer Feedback
                  </h3>
                  {employee.comments.length > 0 ? (
                    employee.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm mb-2">
                        <p className="text-sm text-gray-500 mb-1">
                          {employee.dates[index] || "Date not available"}
                        </p>
                        <p className="text-gray-700">{comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments available</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No employee details available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeSummary;
