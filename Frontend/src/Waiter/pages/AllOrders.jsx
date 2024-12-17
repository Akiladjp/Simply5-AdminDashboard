import axios from "axios";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../Redux/Slices/LogiinSlice";

function AllOrders() {
	const waiterEmail = useSelector(selectEmail);
	const [orderPendingdata, setOrderPending] = useState([]);
	const [waiterID, setWaiterID] = useState();
	const API_URL = import.meta.env.VITE_API_URL;

	

	useEffect(() => {
		axios
			.get(`${API_URL}/orderpending`, { withCredentials: true })
			.then((res) => {
				setOrderPending(res.data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDeleteOrder = (orderID) => {
		console.log(orderID);
		axios
			.delete(`${API_URL}/orderdelete/${orderID}`, {
				withCredentials: true,
			})
			.then(() => {
				setOrderPending((prevOrders) =>
					prevOrders.filter((order) => order.orderID !== orderID)
				);
			})
			.catch((err) => console.log(err));
	};

	const handleAcceptOrder = (orderID) => {
		axios
			.put(
				`${API_URL}/orderaccept/${orderID}`,
				{ waiterID },
				{ withCredentials: true }
			)
			.then(() => {
				window.location.reload();
				// setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="pt-20 md:pt-28">
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

export default AllOrders;
