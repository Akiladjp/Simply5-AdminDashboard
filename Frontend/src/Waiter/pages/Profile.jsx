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
	const [waiterID, setWaiterID] = useState(0);
	const [todayOrders, setTodayOrdes] = useState(0);
	const [monthOrders, setMonthOrdes] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/waiterID/${email}`, {
					withCredentials: true,
				});
				if (response) {
					console.log(response.data.waiterID);
					setWaiterID(response.data.waiterID);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`${API_URL}/OrderCount/${waiterID}`, {
				withCredentials: true,
			});
			if (response) {
				console.log(response.data.count);
				setTodayOrdes(response.data.count)
			}
		};
		fetchData();
	}, [waiterID]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`${API_URL}/OrderCountMonth/${waiterID}`, {
				withCredentials: true,
			});
			if (response) {
				console.log(response.data.orderCountMap);
				setMonthOrdes(response.data.count)
			}
		};
		fetchData();
	}, [waiterID]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/waiterProfile/${email}`,
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

	useEffect(() => {}, []);
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
					<h2 className="mb-4 flex gap-x-3">Today orders:<p className="border-2 border-[#007FA8] w-10 flex justify-center items-center  h-8 rounded">{todayOrders}</p></h2>
					<h2 className="flex  gap-x-3">Monthly orders:
						<p className=" bg-[#007FA8] w-10 flex justify-center items-center  h-8 rounded text-white">{monthOrders}</p>
					</h2>
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
