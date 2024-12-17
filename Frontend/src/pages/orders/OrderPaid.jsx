import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import { SearchComp } from "../../components/SearchComp";
import axios from "axios";

function OrderPaid() {
	const [orderPaiddata, setOrderPaid] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		let url = `${API_URL}/orderpaid`;

		if (searchTerm) {
			url += `?mobileNo=${searchTerm}`;
		}

		axios
			.get(url, { withCredentials: true })
			.then((res) => {
				setOrderPaid(res.data.data);
				console.log(res.data.data);
			})
			.catch((err) => console.log(err));
	}, [searchTerm]);

	// const handleAcceptOrder = (orderID) => {
	//   axios.delete(`${API_URL}/orderpaiddelete/${orderID}`)
	//     .then(() => {
	//       setOrderPaid((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
	//     })
	//     .catch(err => console.log(err));
	// };

	return (
		<div className="w-full flex flex-col mt-8 p-4">
			<div className="searchbar">
				<SearchComp setSearchTerm={setSearchTerm} />
			</div>
			<div className="flex flex-col gap-6 w-full lg:w-full">
				{Array.isArray(orderPaiddata) && orderPaiddata.length > 0 ? (
					orderPaiddata.map((orderpaiddata, index) => (
						<OrderCard
							key={index}
							data={orderpaiddata}
							// onAccept={handleAcceptOrder}
							// title={orderpaiddata.status === 'paid' ? 'DELETE' : ''}
						/>
					))
				) : (
					<div
						className={`
							? "w-[100%] px-32 flex items-center justify-center mx-auto mt-12 h-20 bg-gray-100 shadow-md text-gray-600 text-lg font-semibold uppercase"
						
					`}>
			 No paid orders at the moment. Please check with the customer for pending payments.
					</div>
				)}
			</div>
		</div>
	);
}

export default OrderPaid;
