import { Outlet, useNavigate } from "react-router-dom";
import WaiterHeader from "../Waiter/components/Header";
import WaiterNavbar from "../Waiter/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";


const WaiterLayOut = () => {
	const API_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const [isValied, setIsValied] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/waiter-login-validation`, {
					withCredentials: true,
				});
				console.log("response", response);
				if (response.status === 200) {
					console.log("Login validation successful");
					setIsValied(true);
					if (sessionStorage.getItem("activeMenuIndex") == 0) {
						navigate("/Waiter/pending-orders");
					} else if (sessionStorage.getItem("activeMenuIndex") == 1) {
						navigate("/Waiter/accepted-orders");
					} else if (sessionStorage.getItem("activeMenuIndex") == 2) {
						navigate("/Waiter/delevered-orders");
					} else if (sessionStorage.getItem("activeMenuIndex") == 3) {
						navigate("/Waiter/profile");
					} else {
						navigate("/Waiter/pending-orders");
					}
				} else if (response.data.message == "Unauthorized") {
					console.log("Please realod Page");
					navigate("/");
				} else {
					console.log(response.status, response.data.message);
					navigate("/");
				}
			} catch (err) {
				navigate("/");
				console.error("Error in connecting to login validation API", err);
			}
		};

		fetchData();
	}, []);

	return isValied ? (
		<div className="h-screen">
			<div>
				<WaiterHeader />
			</div>

			<div className="lg:w-full ">
				<Outlet />
			</div>

			<div>
				<WaiterNavbar />
			</div>
		</div>
	) : (
		<div className="h-screen flex items-center justify-center">
			<img src={logo} alt="" />
		</div>
	);
};

export default WaiterLayOut;
