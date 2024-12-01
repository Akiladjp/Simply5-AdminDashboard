import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

import logo from "../assets/logo.png";
const MainLayout = () => {
	const navigate = useNavigate();

	const API_URL = import.meta.env.VITE_API_URL;

	const [isValied, setIsValied] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/admin-login-validation`, {
					withCredentials: true,
				});
				console.log(response.data.message);

				if (response.status === 200) {
					console.log("Login validation successful");
					setIsValied(true);
					
				} else if (response.data.message === "Unauthorized") {
					console.log("Please realod Page");
					navigate("/");
				} else {
					console.log(response.status, response.data.message);
					navigate("/");
				}
			} catch (err) {
				navigate("/");
				console.error("Error in connecting to admin login validation API", err);
			}
		};

		fetchData();
	}, []);

	return isValied ? (
		<div className="h-screen">
			<Header />
			<div className="flex w-full h-screen pt-16 ">
				<div className="flex bg-[#007FA8] w-[20%] lg:w-[16%] xl:w-[12%] fixed h-full z-10">
					<Navbar />
				</div>
				<div className=" w-[80%]  ml-[20%] lg:ml-[16%] xl:ml-[12%]   lg:w-full   ">
					<Outlet />
				</div>
			</div>
		</div>
	) : (
		<div className="h-screen flex items-center justify-center">
			<img src={logo} alt="" />
		</div>
	);
};

export default MainLayout;
