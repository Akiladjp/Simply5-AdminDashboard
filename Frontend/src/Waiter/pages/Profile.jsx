import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutFun, selectEmail } from "../../Redux/Slices/LogiinSlice";

function Profile() {
	const API_URL = import.meta.env.VITE_API_URL;
	const dispatch = useDispatch();
	const email = useSelector(selectEmail);
	console.log(email);
	const navigate = useNavigate();
	const [data, setData] = useState({
		name: "",
		position: "",
		contact: "",
		address: "",
		email,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8081/waiterProfile/${email}`,
					{ withCredentials: true }
				);

				if (response && response.data) {
					setData({
						name: response.data.name || "",
						position: response.data.position || "",
						contact: response.data.phoneNo || "",
						address: response.data.address || "",
						email,
					});
				}
			} catch (err) {
				console.error("Error fetching profile data:", err);
			}
		};

		fetchData();
	}, []);

	const handleCookies = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/logout`,
				{},
				{ withCredentials: true }
			);

			if (response.status === 200) {
				console.log("Logged out successfully");
				dispatch(logoutFun());
				navigate("/");
			} else {
				console.log("Logout failed");
			}
		} catch (err) {
			console.log("Error in connecting API", err);
		}
	};

	const logout = () => {
		console.log("in logout");
		handleCookies();
		sessionStorage.removeItem("activeMenuIndex");
	};
	return (
		<div className="pt-20 px-4 md:px-8 lg:px-12">
			<div className="border-[#007FA8] border text-black rounded-lg p-8">
				<h2 className="text-2xl font-bold mb-4">User Profile</h2>
				<div className="space-y-4">
					<p className="flex items-center">
						<FaUserCheck className="mr-3 text-xl" />{" "}
						<span className="text-lg">{data.name}</span>
					</p>
					<p className="flex items-center">
						<FaBuildingUser className="mr-3 text-xl" />{" "}
						<span className="text-lg">{data.position}</span>
					</p>
					<p className="flex items-center">
						<FaPhoneAlt className="mr-3 text-xl" />{" "}
						<span className="text-lg">{data.contact}</span>
					</p>
					<p className="flex items-center">
						<MdEmail className="mr-3 text-xl" />{" "}
						<span className="text-lg">{email}</span>
					</p>
					<p className="flex items-center">
						<IoLocationSharp className="mr-3 text-xl" />{" "}
						<span className="text-lg">{data.address}</span>
					</p>
				</div>
			</div>

			<div className="px-4 md:px-8 lg:px-12 border-[#007FA8] border text-black rounded-lg p-8 mt-8">
				<div className=" flex flex-col mr-3 text-xl">
					<h2 className="mb-4">Today orders:</h2>
					<h2>Monthly orders:</h2>
				</div>
			</div>

			<div className="flex justify-center mt-6">
				<button
					className="py-3 px-8 absolute bottom-28 bg-[#007FA8] text-white font-semibold rounded-md shadow-lg hover:scale-105 active:scale-95"
					onClick={() => logout()}>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Profile;
