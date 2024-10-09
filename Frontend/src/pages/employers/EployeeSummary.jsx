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
					// Assuming response.data.EmpDetails is an array of employee details
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
					console.log(response.data.count);
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
					console.log(response.data.count);
					setMonthOrderCount(response.data.count);
				}
			} catch (err) {
				console.log("Error in axios", err);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="w-full h-screen items-start  justify-start mt-32  flex flex-col">
			<h1 className="text-4xl text-center w-full">EMPLOYEE SUMMARY</h1>
			<div className="w-[90%] mx-auto">
				{summaryDetails.length > 0 ? (
					summaryDetails.map((employee) => (
						<div key={employee.empID} className=" mb-4 p-2">
							<div className="flex gap-x-4">
								<ul className="font-bold">{employee.name}:</ul>
								<p>{employee.empID}</p>
								<p>
									Today Orders:
									<span>
										{OrdersCount[employee.empID] ? (
											<span>{OrdersCount[employee.empID]}</span>
										) : (
											<span>0</span>
										)}
									</span>
								</p>
								<p> n 
									Monthly Orders:
									<span>
										{MonthOrdersCount[employee.empID] ? (
											<span>{MonthOrdersCount[employee.empID]}</span>
										) : (
											<span>0</span>
										)}
									</span>
								</p>
							</div>
							<div className=" w-[95%] mx-auto h-auto flex flex-col ">
								{employee.comments.length > 0 ? (
									employee.comments.map((comment, index) => (
										<div
											key={index}
											className="flex h-12 items-center gap-x-2  border-b-2 border-black">
											<span>
												{/* Display corresponding date for each comment */}
												{employee.dates[index] || "Date not available"}
											</span>
											<span>{comment}</span>
										</div>
									))
								) : (
									<p>No comments available</p>
								)}
							</div>
						</div>
					))
				) : (
					<p className="text-center">No employee details available.</p>
				)}
			</div>
		</div>
	);
}

export default EmployeeSummary;
