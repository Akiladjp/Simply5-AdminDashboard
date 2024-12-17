import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import axios from "axios";
import { SearchComp } from "../../components/SearchComp";
import ReactPlayer from 'react-player';
import { FaUserCheck } from "react-icons/fa6";
import loading from '../../assets/loading.gif'
function OrderAccept() {
	const [orderAcceptdata, setOrderAccept] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		const fetchOrders = async () => {
			let url = `${API_URL}/orderaccepted`;
			if (searchTerm) {
				url += `?mobileNo=${searchTerm}`;
			}

			try {
				const res = await axios.get(url, { withCredentials: true });
				setOrderAccept(res.data.data);
				console.log(res.data.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchOrders();
	}, [searchTerm]);

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
							title={orderacceptdata.status === "accept" ? "Delivering..." : ""}
							buttontextColor={
								orderacceptdata.status === "accept"
									? "text-[rgb(225,0,0)]"
									: "text-[rgb(255,255,255)]]"
							}
							borderColor={
								orderacceptdata.status === "accept"
									? "border-[rgb(225,255,255)]"
									: "border-[rgb(0,127,168)]"
							}
						/>
					))
				) : (
					<div
						className={`
							? "w-[100%] px-32 flex items-center justify-center mx-auto mt-12 h-20 bg-gray-100 shadow-md text-gray-600 text-lg font-semibold uppercase"
						
					`}>
						No orders at the moment. Accept the orders!
					</div>
				)}
			</div>
		</div>
	);
}

export default OrderAccept;
