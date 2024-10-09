import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeCard from "../../components/EmployeeCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EployeeSummary from "./EployeeSummary";

function Employee() {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8081/employeecard/")
			.then((res) => {
				console.log(res.data.employees); // Log the employees array from the response
				setEmployees(res.data.employees);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<div className="w-full h-screen   flex flex-col items-center justify-start overflow-hidden">
				{/* Main content area */}
				<div className="translate-x-0 opacity-100 flex flex-wrap items-center fixed justify-center mt-2 ml-16 mr-12 lg:ml-10   top-32 p-4">
					<div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  mt-8">
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
							<EmployeeCard key={index} data={employee} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Employee;
