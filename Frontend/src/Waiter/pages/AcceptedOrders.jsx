import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import {
	resetTimerState,
	setTimerState,
} from "../../Redux/Slices/OrderTimerSlice";
import { useDispatch } from "react-redux";

function AcceptedOrders() {
	const [orderAcceptdata, setOrderAccept] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("http://localhost:8081/order_waiter_accepted",{withCredentials:true})
			.then((res) => {
				setOrderAccept(res.data.data); // Update to set the data array
				// Log the response data
			})
			.catch((err) => console.log(err));
	}, []);


	const handleDeleteOrder = (orderID) => {
		console.log(orderID);
		axios
			.delete(`http://localhost:8081/orderdelete/${orderID}`,{withCredentials:true})
			.then(() => {
				setOrderAccept((prevOrders) =>
					prevOrders.filter((order) => order.orderID !== orderID)
				);
			})
			.catch((err) => console.log(err));
	};

	const handleAcceptOrder = (orderID) => {
		axios
			.put(`http://localhost:8081/orderstatusdelivered/${orderID}`,{},{withCredentials:true})
			.then(() => {
				console.log(res.data);
				window.location.reload();
	
				// setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
			})
			.catch((err) => console.log(err));
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
