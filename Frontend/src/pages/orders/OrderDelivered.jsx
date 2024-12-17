import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import axios from "axios";
import { SearchComp } from "../../components/SearchComp";

function OrderDelivered() {
    const [orderDelivereddata, setOrderDelivered] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		const fetchOrders = async () => {
			let url = "${API_URL}/orderdelivered";
			if (searchTerm) {
				url += `?mobileNo=${searchTerm}`;
			}

			try {
				const res = await axios.get(url,{withCredentials:true});
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
	// 		.delete(`${API_URL}/orderdelete/${orderID}`)
	// 		.then(() => {
	// 			setOrderDelivered((prevOrders) =>
	// 				prevOrders.filter((order) => order.orderID !== orderID)
	// 			);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	const handleDeliveredOrder = (orderID) => {
		axios
			.put(`${API_URL}/orderstatuspaid/${orderID}`,{},{withCredentials:true})
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
					<div
						className={`
							? "w-[100%] px-32 flex items-center justify-center mx-auto mt-12 h-20 bg-gray-100 shadow-md text-gray-600 text-lg font-semibold uppercase"
						
					`}>
						  No orders at the moment. Waiting for orders to be delivered!
					</div>
				)}
			</div>
		</div>
	);
}

export default OrderDelivered