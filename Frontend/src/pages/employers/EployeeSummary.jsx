import axios from "axios";
import React, { useEffect, useState } from "react";

function EmployeeSummary() {
	const API_URL = import.meta.env.VITE_API_URL;
	const [summaryDetails, setSummary] = useState([]);
	const [OrdersCount, setOrderCount] = useState(0);
	const [MonthOrdersCount, setMonthOrderCount] = useState(0);

	// Get today's date in the format: 'YYYY-MM-DD'
	const today = new Date().toISOString().split('T')[0]; 

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
		<div className="min-h-screen mt-8 px-4">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
					Employee Summary
				</h1>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-gray-200 border-b">
								<th className="px-6 py-4 text-left text-gray-600 font-semibold align-top">
									Employee Name
								</th>
								<th className="px-6 py-4 text-left text-gray-600 font-semibold align-top">
									Employee ID
								</th>
								<th className="px-6 py-4 text-left text-gray-600 font-semibold align-top">
									Today's Orders
								</th>
								<th className="px-6 py-4 text-left text-gray-600 font-semibold align-top">
									Monthly Orders
								</th>
								<th className="px-6 py-4 text-left text-gray-600 font-semibold align-top">
									Customer Feedback
								</th>
							</tr>
						</thead>
						<tbody>
							{summaryDetails.length > 0 ? (
								summaryDetails.map((employee) => (
									<tr
										key={employee.empID}
										className="border-b hover:bg-[#dfe3e6] align-top group">
										<td className="px-6 py-4 text-gray-800 align-top">
											{employee.name}
										</td>
										<td className="px-6 py-4 text-gray-600 align-top">
											{employee.empID}
										</td>

										{/* Today's Orders with new styling */}
										<td className="px-6 py-4 text-gray-600 align-top">
											<div className="bg-green-100 text-green-700 text-center font-semibold rounded-full py-2 px-4">
												{OrdersCount[employee.empID]
													? OrdersCount[employee.empID]
													: 0}
											</div>
										</td>

										{/* Monthly Orders with new styling */}
										<td className="px-6 py-4 text-gray-600 align-top">
											<div className="bg-blue-100 text-blue-700 text-center font-semibold rounded-full py-2 px-4">
												{MonthOrdersCount[employee.empID]
													? MonthOrdersCount[employee.empID]
													: 0}
											</div>
										</td>

										{/* Customer Feedback Section with color highlight for today's date */}
										<td className="px-6 py-4 text-gray-600 align-top">
											{employee.comments.length > 0 ? (
												employee.comments.map((comment, index) => {
													// Check if the comment's date matches today's date
													const isToday = employee.dates[index] === today;
													return (
														<div
															key={index}
															className={`p-4 rounded-lg shadow-sm mb-4 ${
																isToday
																	? "bg-yellow-200 border-l-4 border-yellow-600"
																	: "bg-gray-50"
															}`}>
															<p
																className={`text-sm ${
																	isToday ? "text-yellow-700" : "text-gray-800"
																} font-semibold mb-1`}>
																{employee.dates[index] || "Date not available"}
															</p>
															<p
																className={`text-base ${
																	isToday ? "text-yellow-800" : "text-gray-700"
																} leading-relaxed`}>
																{comment}
															</p>
														</div>
													);
												})
											) : (
												<p className="text-gray-500">No comments available</p>
											)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="5"
										className="text-center py-4 text-gray-600 group-hover:text-gray-500">
										No employee details available.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default EmployeeSummary;
