import axios from "axios";
import React, { useEffect, useState } from "react";

function Billsection({ mobileno }) {
	const API_URL = import.meta.env.VITE_API_URL;
	const [currentDate, setCurrentDate] = useState(
		new Date().toLocaleDateString()
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date().toLocaleDateString());
		}, 86400000);

		return () => clearInterval(intervalId);
	}, []);

	const [billDataOrder, setBillDataOrder] = useState({
		billNo: "",
		time: "",
		total: "",
	});

	const [itemInfo, setItemInfo] = useState([]);

	const [BillNumbers, setBillNumbers] = useState([]);
	const [billNumbers, setBillNumber] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/billSection/${mobileno}`, {
					withCredentials: true,
				});

				if (response) {
					let length = response.data.length - 1;
					console.log("response data", response.data);
					const order = response.data[length];
					setBillDataOrder({
						billNo: order.orderID || "null",
						time: order.time || "null",
						total: order.total || "null",
					});

					const updatedBillNumbers = [...BillNumbers];
					for (let i = 0; i < response.data.length; i++) {
						let order = response.data[i];
						if (!updatedBillNumbers.includes(order.orderID)) {
							updatedBillNumbers.push(order.orderID);
						}
					}

					setBillNumbers(updatedBillNumbers);
					const text = updatedBillNumbers.join("-");
					setBillNumber(text);

					setItemInfo(response.data);
				} else {
					console.log("Error in query");
				}
			} catch (err) {
				console.log("Error in fetching data", err);
			}
		};

		fetchData();
	}, [mobileno]); // Add BillNumbers as a dependency if needed

	return (
		<div className="scale-90 flex flex-col items-center w-full p-6 bg-gray-100 lg:w-5/5 lg:m-auto">
			{/* Header Section */}
			<div className="text-center mb-6">
				<h1 className="text-4xl font-extrabold uppercase text-gray-800 tracking-wide">
					Roseluxury Hotel
				</h1>
				<h3 className="text-sm text-gray-500 mt-2">Hotline: 021 55 55 222</h3>
			</div>

			{/* Booking Details */}
			<div className="flex w-full justify-between gap-8 px-6 py-4 bg-white rounded-md shadow-lg mb-6">
				<div className="flex items-center">
					<p className="text-gray-700 font-semibold">B. No:</p>
					<span className="ml-2 text-gray-600">{billDataOrder.billNo}</span>
				</div>
				<div className="flex flex-col items-end">
					<p className="text-gray-700">
						Date: <span className="font-medium">{currentDate}</span>
					</p>
					<p className="text-gray-700">
						Time: <span className="font-medium">{billDataOrder.time}</span>
					</p>
				</div>
			</div>

			{/* Table Section */}
			<div className="bg-white rounded-lg shadow-md md:scale-100 scale-95 transition-transform duration-300">
				<table className="min-w-full ">
					<thead className="bg-gradient-to-r bg-[#007FA8]  text-white w-full ">
						<tr>
							<th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
								Item
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
								Rate
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
								Qty
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
								Amount
							</th>
						</tr>
					</thead>
					<tbody className="">
						{itemInfo.map((data, index) => (
							<tr
								key={index}
								className="hover:bg-gray-100 transition-all duration-200">
								<td className="px-6 py-4 text-gray-700">{data.name}</td>
								<td className="px-6 py-4 text-gray-700">{data.price}</td>
								<td className="px-6 py-4 text-gray-700">
									{data.totalQuantity}
								</td>
								<td className="px-6 py-4 text-gray-700">
									{data.totalQuantity * data.price}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="mt-6">
				<table className="min-w-full text-gray-700">
					<tfoot className="text-right">
						<tr className="bg-gray-50">
							<td
								colSpan="3"
								className="px-6 py-4 text-right font-semibold text-lg">
								Order Price:
							</td>
							<td className="px-6 py-4 font-semibold text-lg">
								{/* Calculate the total order price */}
								{
									itemInfo
										.reduce((total, data) => {
											return total + data.price * data.totalQuantity;
										}, 0)
										.toFixed(2) // Reduce key word use for find Sum and toFixed(2) use to  fix two point of the answer;
								}
							</td>
						</tr>
						<tr className="bg-gray-50">
							<td
								colSpan="3"
								className="px-6 py-4 text-right font-semibold text-lg">
								Service Charge:
							</td>
							<td className="px-6 py-4 font-semibold text-lg">
								{/* Calculate the total order price */}
								{
									(
										itemInfo.reduce((total, data) => {
											return total + data.price * data.totalQuantity;
										}, 0) * 0.1
									).toFixed(2) // Reduce key word use for find Sum;
								}
							</td>
						</tr>
						<tr className="bg-gray-50">
							<td
								colSpan="3"
								className="px-6 py-4 text-right font-semibold text-lg">
								Total Price:
							</td>
							<td className="px-6 py-4 font-semibold text-lg">
								<p>
									{
										(
											itemInfo.reduce((total, data) => {
												return total + data.price * data.totalQuantity;
											}, 0) * 1.1
										).toFixed(2) // Reduce key word use for find Sum;
									}
								</p>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>

			{/* Feedback Section */}
		</div>
	);
}

export default Billsection;
