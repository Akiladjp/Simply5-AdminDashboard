import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { useSelector } from "react-redux";
import { selectEmail } from "../../Redux/Slices/LogiinSlice";
import { isEmpty } from "lodash";

function DeliveredOreders() {
  const API_URL = import.meta.env.VITE_API_URL;
	const [orderAcceptdata, setOrderAccept] = useState([]);
	const [waiterID, setWaiterID] = useState(0);
	const email = useSelector(selectEmail);
const [dataIsEmpty,setISempty] =useState(false);
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
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/order_waiter_delivered/${waiterID}`,
					{ withCredentials: true }
				);
				if (response) {
					setOrderAccept(response.data.data); // Update to set the data array
          console.log(response.data.data); // Log the response data
				}
        console.log("error in fething data no data");
        setISempty(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [waiterID]);

	const handleDeleteOrder = (orderID) => {
		console.log(orderID);
		axios
			.put(
				`${API_URL}/order_deleverd_delete/${orderID}`,
				{},
				{ withCredentials: true }
			)
			.then(() => {
				setOrderAccept((prevOrders) =>
					prevOrders.filter((order) => order.orderID !== orderID)
				);
			})
			.catch((err) => console.log(err));
	};

	const handleAcceptOrder = (orderID) => {
		axios
			.put(
				`${API_URL}/orderstatusdelivered/${orderID}`,
				{},
				{ withCredentials: true }
			)
			.then(() => {
				window.location.reload();
				// setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="pt-20 md:pt-28 flex flex-col gap-y-4">
     <div className={dataIsEmpty ? "w-full flex justify-center items-center" : "hidden"}>
    No Data
</div>

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

export default DeliveredOreders;
