import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import axios from "axios";
import { SearchComp } from "../../components/SearchComp";

function OrderDelivered() {
    const [orderDelivereddata, setOrderDelivered] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			let url = "http://localhost:8081/orderdelivered";
			if (searchTerm) {
				url += `?mobileNo=${searchTerm}`;
			}

			try {
				const res = await axios.get(url);
				setOrderDelivered(res.data.data);
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
	// 			setOrderDelivered((prevOrders) =>
	// 				prevOrders.filter((order) => order.orderID !== orderID)
	// 			);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	const handleDeliveredOrder = (orderID) => {
		axios
			.put(`http://localhost:8081/orderstatuspaid/${orderID}`)
			.then(() => {
				setOrderDelivered((prevOrders) =>
					prevOrders.map((order) =>
						order.orderID === orderID ? { ...order, status: "paid" } : order
					)
				);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="w-full flex flex-col mt-8 p-4">
			<div className="searchbar">
				<SearchComp setSearchTerm={setSearchTerm} />
			</div>
			<div className="flex flex-col gap-6 w-full lg:w-full">
				{Array.isArray(orderDelivereddata) && orderDelivereddata.length > 0 ? (
					orderDelivereddata.map((orderdelivereddata, index) => (
						<OrderCard
							key={index}
							data={orderdelivereddata}
							// onDelete={handleDeleteOrder}
							onAccept={handleDeliveredOrder}
							title={
								orderdelivereddata.status === "delivered"	
									? "PAID"
									: ""
							}
                            buttontextColor={orderdelivereddata.status === "delivered" ? "text-[rgb(255,255,255)]": ""} 
                            borderColor={orderdelivereddata.status === "delivered" ? "border-[rgb(0,127,168)]": ""} 
                            buttonColor={orderdelivereddata.status === "delivered" ? "bg-[rgb(0,127,168)]": ""}
						/>
					))
				) : (
					<div className="text-center text-gray-500">No orders found.</div>
				)}
			</div>
		</div>
	);
}

export default OrderDelivered