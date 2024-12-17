import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import {
	resetTimerState,
	setTimerState,
} from "../../Redux/Slices/OrderTimerSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "../../Redux/Slices/LogiinSlice";

function AcceptedOrders() {
	const [orderAcceptdata, setOrderAccept] = useState([]);
	const dispatch = useDispatch();
	const email = useSelector(selectEmail);
	const [waiterID, setWaiterID] = useState(0);
	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/waiterID/${email}`,
					{ withCredentials: true }
				);
				if (response) {
					// console.log(response.data.waiterID);
					setWaiterID(response.data.waiterID);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log(waiterID);
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/order_waiter_accepted/${waiterID}`,
					{
						withCredentials: true,
					}
				);
				if (response) {
					setOrderAccept(response.data.data); // Update to set the data array
				}
			} catch (error) {
				console.log(error);
			}

			// Log the response data
		};
		fetchData();
	}, [waiterID]);

	const handleDeleteOrder = (orderID) => {
		console.log(orderID);
		axios
			.delete(`${API_URL}/orderdelete/${orderID}`, {
				withCredentials: true,
			})
			.then(() => {
				setOrderAccept((prevOrders) =>
					prevOrders.filter((order) => order.orderID !== orderID)
				);
			})
			.catch((err) => console.log(err));
	};

	const handleAcceptOrder = async (orderID) => {
		try {
			const response = await axios.put(
				`${API_URL}/orderstatusdelivered/${orderID}`,
				{},
				{ withCredentials: true }
			);
			if (response) {
				window.location.reload();
			}
			console.log("no data");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="pt-20 md:pt-28 flex flex-col gap-y-4   w-full top-16 overflow-y-scroll  mb-[98px]">
			{Array.isArray(orderAcceptdata) &&
				orderAcceptdata.map((orderacceptdata, index) => (
					<OrderCard
						key={index}
						data={orderacceptdata}
						onDelete={handleDeleteOrder}
						onAccept={handleAcceptOrder}
						title={orderacceptdata.status === "accept" ? "PAID" : ""}
					/>
				))}
		</div>
	);
}

export default AcceptedOrders;
