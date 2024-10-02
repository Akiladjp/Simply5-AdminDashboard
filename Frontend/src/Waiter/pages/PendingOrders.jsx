import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	resetTimerState,
	setTimerState,
} from "../../Redux/Slices/OrderTimerSlice";
import { useNavigate } from "react-router-dom";

function PendingOrders() {
	const [orderPendingdata, setOrderPending] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:8081/orderpending")
			.then((res) => {
				setOrderPending(res.data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDeleteOrder = (orderID) => {
		axios
			.delete(`http://localhost:8081/orderdelete/${orderID}`)
			.then(() => {
				setOrderPending((prevOrders) =>
					prevOrders.filter((order) => order.orderID !== orderID)
				);
			})
			.catch((err) => console.log(err));
	};

	const handleAcceptOrder = (orderID) => {
		axios
			.put(`http://localhost:8081/orderaccept/${orderID}`)
			.then(() => {
				dispatch(
					setTimerState(orderPendingdata[0]["orderID"].toString() + "-" + true)
				);
				console.log(orderID);
				setTimeout(() => {
					dispatch(resetTimerState()); // Reset timer state after 5 seconds
				}, 25000);
          window.location.reload();
				// setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="pt-20 md:pt-28 flex  flex-col gap-y-4">
			{Array.isArray(orderPendingdata) &&
				orderPendingdata.map((orderpendingdata, index) => (
					<OrderCard
						key={index}
						data={orderpendingdata}
						onDelete={handleDeleteOrder}
						onAccept={handleAcceptOrder}
						title={orderpendingdata.status === "pending" ? "ACCEPT" : "PAID"}
					/>
				))}
		</div>
	);
}

export default PendingOrders;
