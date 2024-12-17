import { useState, useEffect } from "react";
import "../App.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectToken } from "../Redux/Slices/LogiinSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const API_URL = import.meta.env.VITE_API_URL;
	const toekenValid = useSelector(selectToken);
	const [prevOrderCount, setPrevOrderCount] = useState(0);
	const [isFirstFetch, setIsFirstFetch] = useState(true); // Track the initial fetch

	useEffect(() => {
		let interval;

		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/get_notification`, {
					withCredentials: true,
				});

				const newOrderCount = response.data.length;

				if (!isFirstFetch && newOrderCount > prevOrderCount) {
					toast(`New orders received!`);
				}

				// Update previous count state
				setPrevOrderCount(newOrderCount);
				setIsFirstFetch(false);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			}
		};

		if (toekenValid) {
			fetchData(); // Fetch immediately
			interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
		}

		return () => {
			clearInterval(interval);
		};
	}, [prevOrderCount, isFirstFetch, toekenValid]);

	// Update the current time every second
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="bg-[#056A8B] text-white flex md:pb-4 md:pt-4 fixed w-full h-16 font-medium z-50">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>

			<div className="flex items-center w-[70%] mt-1 text-center ml-4 tracking-wider text-sm md:text-base lg:text-lg">
				<h1>ADMIN DASHBOARD</h1>
			</div>
			<div className="w-full ">
				<p className="text-[0] text-right mt-1 mr-5 md:text-[16px] lg:text-[20px] z-50">
					{currentDate.toLocaleTimeString()}
				</p>
			</div>
		</div>
	);
}
