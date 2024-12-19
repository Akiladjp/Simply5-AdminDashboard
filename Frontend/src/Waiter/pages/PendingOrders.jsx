import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	resetTimerState,
	setTimerState,
} from "../../Redux/Slices/OrderTimerSlice";
import { useNavigate } from "react-router-dom";
import { selectEmail } from "../../Redux/Slices/LogiinSlice";

function PendingOrders() {
	const [waiterID, setWaiterID] = useState(0);
	const [orderPendingdata, setOrderPending] = useState([]);
	const API_URL = import.meta.env.VITE_API_URL;
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const email = useSelector(selectEmail);
	//gettinhh setWaiterID
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`${API_URL}/waiterID/${email}`,
				{ withCredentials: true }
			);
			if (response) {
				setWaiterID(response.data.waiterID);
			}
		};
		fetchData();
	}, []);
	useEffect(() => {
		axios
			.get(`${API_URL}/orderpending`, { withCredentials: true })
			.then((res) => {
				console.log(res.data.data);
				setOrderPending(res.data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	// const handleDeleteOrder = (orderID) => {
	// 	axios
	// 		.delete(`${API_URL}/orderdelete/${orderID}`, {
	// 			withCredentials: true,
	// 		})
	// 		.then(() => {
	// 			setOrderPending((prevOrders) =>
	// 				prevOrders.filter((order) => order.orderID !== orderID)
	// 			);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// const handleAcceptOrder = (orderID,time) => {
	// 	axios
	// 		.put(
	// 			`${API_URL}/orderaccept/${orderID}`,
	// 			{selectWaiterid:waiterID},
	// 			{ withCredentials: true }
	// 		)
	// 		.then(() => {
	// 			console.log(orderID);

	// 			//  window.location.reload();
	// 			// setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
	// 		})
	// 		.catch((err) => console.log(err));
	// };
	return (
		<div className="pt-20 md:pt-28 flex  flex-col gap-y-4 ">
			<div className="mb-36 gap-y-4 flex flex-col">
				{Array.isArray(orderPendingdata) &&
					orderPendingdata.map((orderpendingdata, index) => (
						<OrderCard
							key={index}
							data={orderpendingdata}
						//	onDelete={handleDeleteOrder}
							
							waiterID={waiterID}
							title={orderpendingdata.status === "pending" ? "ACCEPT" : "PAID"}
						/>
					))}
			</div>
		</div>
	);
}

export default PendingOrders;
