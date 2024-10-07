import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import axios from "axios";
import { SearchComp } from "../../components/SearchComp";

function OrderAccept() {
	const [orderAcceptdata, setOrderAccept] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			let url = "http://localhost:8081/orderaccepted";
			if (searchTerm) {
				url += `?mobileNo=${searchTerm}`;
			}

			try {
				const res = await axios.get(url);
				setOrderAccept(res.data.data);
				console.log(res.data.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchOrders();
	}, [searchTerm]);

	// const handleDeleteOrder = (orderID) => {
	// 	console.log(orderID);
	// 	axios
	// 		.delete(`http://localhost:8081/orderdelete/${orderID}`)
	// 		.then(() => {
	// 			setOrderAccept((prevOrders) =>
	// 				prevOrders.filter((order) => order.orderID !== orderID)
	// 			);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// const handleAcceptOrder = (orderID) => {
	// 	axios
	// 		.put(`http://localhost:8081/orderstatuspaid/${orderID}`)
	// 		.then(() => {
	// 			setOrderAccept((prevOrders) =>
	// 				prevOrders.map((order) =>
	// 					order.orderID === orderID ? { ...order, status: "paid" } : order
	// 				)
	// 			);
	// 			window.location.reload();
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	return (
		<div className="w-full flex flex-col mt-8 p-4">
			<div className="searchbar">
				<SearchComp setSearchTerm={setSearchTerm} />
			</div>
			<div className="flex flex-col gap-6 w-full lg:w-full">
				{Array.isArray(orderAcceptdata) && orderAcceptdata.length > 0 ? (
					orderAcceptdata.map((orderacceptdata, index) => (
						<OrderCard
							key={index}
							data={orderacceptdata}
							// onDelete={handleDeleteOrder}
							// onAccept={handleAcceptOrder}
							title={
								orderacceptdata.status === "accept"	
									? "Delivering"
									: ""
							}
							buttontextColor={orderacceptdata.status === "accept" ? "text-[rgb(225,0,0)]" : "text-[rgb(255,255,255)]]"}
							borderColor={orderacceptdata.status === "accept" ? "border-[rgb(225,0,0)]" : "border-[rgb(0,127,168)]"}
						/>
					))
				) : (
					<div className="text-center text-gray-500">No orders found.</div>
				)}
			</div>
		</div>
	);
}

export default OrderAccept;
