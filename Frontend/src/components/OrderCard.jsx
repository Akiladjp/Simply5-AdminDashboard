import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import loading from "../assets/loading1.gif";
import Billsection from "./Billsection";

export const OrderCard = ({
	data,
	onDelete,
	onAccept,
	title,
	buttontextColor,
	borderColor,
	buttonColor,
	waiterID,
}) => {
	const [showDetails, setShowDetails] = useState(false);
	const API_URL = import.meta.env.VITE_API_URL;
	const [selectMobile, setSelectMobile] = useState(0);
	const [blurEnable, setBlurEnable] = useState(false);
	const [isAssign, setIsAssign] = useState(false);
	const [waiteridies, setWaiterID] = useState([]);
	const [paidItems, setPaidItem] = useState([]);
	const [selectWaiterid, setSelectwaiterid] = useState([]);
	const [billDetails, setBillDetails] = useState([]);
	const [billOrderDetails, setOrderBillDetails] = useState([]);

	const [showPrint, setShowPrint] = useState(false);
	const items = data.items ? JSON.parse(data.items) : [];

	const toggleDetails = (mobileNo) => {
		setSelectMobile(mobileNo);

		setShowDetails((prevShowDetails) => !prevShowDetails);
	};

	useEffect(() => {
		const fetchDataPaid = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/getPaiedItem/${selectMobile}`,
					{ withCredentials: true }
				);
				if (response) {
					setPaidItem(response.data.paidItems);
				}
			} catch (error) {
				console.log(error);
			}
		};
		const fetchDataDiliver = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/getDeliveryItem/${selectMobile}`,
					{ withCredentials: true }
				);
				if (response) {
					setPaidItem(response.data.paidItems);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (selectMobile !== 0) {
			if (title === "PAID") {
				fetchDataDiliver();
			}
			if (title === "DELETE") {
				fetchDataPaid();
			}
		}
	}, [selectMobile]);

	useEffect(() => {
		setBillDetails(paidItems, data);
	}, [paidItems]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/getWaiterIdies`, {
					withCredentials: true,
				});
				if (response) {
					setWaiterID(response.data.waiterIdies);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const handleReject = (orderID,time) => {
		console.log("in delete",orderID,time);
		axios
			.put(
				`${API_URL}/order_deleverd_reject/${orderID}`,
				{time:time},
				{ withCredentials: true }
			)
			.then(() => {
				window.location.reload();
				
			})
			.catch((err) => console.log(err));
	};
	

	const handleAccept = async (mobileNo) => {
		setSelectMobile(mobileNo);

		console.log("in handle Accept");
		if (title == "ACCEPT") {
			setBlurEnable(true);
			setIsAssign(true);
		} else if (title == "PAID") {
			setShowPrint(true);
			handlePrint(data, paidItems);
			setSelectMobile(data.mobileNo);
			setShowPrint(true);
			handlePrint(data, paidItems);
			setSelectMobile(data.mobileNo);

			try {
				const response = await axios.put(
					`${API_URL}/orderstatuspaid/${selectMobile}`,
					{},
					{
						withCredentials: true,
					}
				);
				if (response) {
					setTimeout(() => {
						setShowPrint(true);
						handlePrint(data, paidItems);
						setSelectMobile(data.mobileNo);
					}, 1000); // Add a comma here
					//	window.location.reload();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handlePrint = async (data, items) => {};

	const handleSelectChange = (event) => {
		const selectedWaiterID = event.target.value;

		// Process the selected waiter ID as needed
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const selectedWaiterID = event.target.waiterID.value;
		const time = event.target.time.value;
		console.log(selectedWaiterID, time);
		setSelectwaiterid(selectedWaiterID);
		accptWithId(selectedWaiterID, time);
	};

	const accptWithId = async (selectWaiterid, time) => {
		const response = await axios.put(
			`${API_URL}/orderaccept/${data.orderID}`,
			{ selectWaiterid, time },
			{ withCredentials: true }
		);
		if (response) {
			window.location.reload();
			onAccept(data.orderID);
		}
	};
	const closePopUp = () => {
		setIsAssign(false);
		setBlurEnable(false);
	};
	return (
		<>
			<div
				className={`${
					showPrint
						? "w-[100%] left-0  mx-auto h-screen opacity-70 bg-gray-900 absolute top-0 z-10 "
						: "hidden"
				}`}></div>
			<div
				className={`${
					showPrint
						? "w-[50%] left-[30%] mx-auto h-[100vh] my-auto bg-white absolute top-0 z-50 overflow-hidden  "
						: "hidden"
				}`}>
				{showPrint && (
					<div className="mt-12 overflow-y-scroll h-auto">
						<Billsection mobileno={selectMobile} />
					</div>
				)}
				<div className="flex p-2 bottom-0 items-center justify-center gap-x-8 h-auto  w-96 mx-auto  mt-2  absolute left-[30%] ">
					<button
						className="bg-red-600 uppercase hover:bg-red-700 px-10 text-lg font-semibold text-white  h-12"
						onClick={() => {
							setShowPrint(false);
						}}>
						Cancel
					</button>
					<button
						onClick={() => {
							window.location.reload();
						}}
						className="bg-[#007FA8] opacity-80 hover:opacity-100 uppercase  px-10 text-lg font-semibold text-white  h-12">
						Print
					</button>
				</div>
			</div>

			<div
				className={`${
					blurEnable
						? "w-full h-full left-0 bg-gray-700  opacity-75  top-0 absolute z-10"
						: ""
				}`}></div>
			<div
				className={`${
					isAssign
						? "absolute w-96 h-40 top-[45%] left-[45%] z-50 bg-gray-100 border-2 rounded-md flex  flex-col items-center"
						: "hidden "
				}`}>
				<div className="w-6 h-6 cursor-pointer right-0  top-0 absolute bg-red-600 rounded-md flex items-center justify-center">
					<IoClose
						className="text-base text-white"
						onClick={() => {
							closePopUp();
						}}
					/>
				</div>
				<p className="mt-2 font-bold text-lg">SELECT THE WAITER FOR ORDER</p>
				<div className="w-full  h-20 flex justify-center ">
					<form
						onSubmit={handleSubmit}
						action=""
						className="w-full h-full  flex items-center  px-2 ">
						<input
							type="text"
							hidden
							id="time"
							value={data.time}
							onChange={handleSelectChange}
						/>
						<select
							onChange={handleSelectChange}
							className="w-3/5 h-10 bg-gray-300 text-center"
							name="waiterID"
							id="waiterID">
							<option value="" hidden>
								SELECT WAITERID
							</option>
							{waiteridies.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</select>

						<div className="w-2/5 flex items-center justify-center ">
							<button className="text-white rounded-sm px-4 py-2 bg-[#007FA8]">
								Assign
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="border-[rgb(0,127,168)] border-[1px] px-4 w-full p-2 ">
				<div className="grid grid-cols-12 items-center py-2 gap-4">
					<div className="col-span-1 flex items-center justify-center w-10 h-10 bg-[#007FA8] rounded-full lg:w-12 lg:h-12 xl:w-14 xl:h-14">
						<p className="text-md font-medium text-white lg:text-xl xl:text-2xl">
							{data.tableNo}
						</p>
					</div>

					<div className="col-span-1 text-center font-semibold lg:text-xl xl:text-2xl">
						{data.orderID}
					</div>

					<div className="col-span-3 xl:col-span-2">
						<p className="font-semibold lg:text-xl xl:text-2xl">
							{data.userName}
						</p>
						<p className="font-medium text-sm lg:text-base xl:text-xl">
							0{data.mobileNo}
						</p>
					</div>

					<div className="col-span-2 xl:col-span-1 text-center font-semibold lg:text-xl xl:text-2xl">
						Rs.{data.total}/=
					</div>

					<div className="col-span-5 xl:col-span-7 flex gap-2 justify-end">
						<button
							className="bg-white px-6 py-1 border-[rgb(0,127,168)] border-2 text-[rgb(0,127,168)] font-semibold lg:text-xl"
							onClick={() => {
								toggleDetails(data.mobileNo);
							}}>
							{showDetails ? "HIDE" : "VIEW"}
						</button>
						{data.status !== "paid" && (
							<button
								className={`${buttontextColor} ${buttonColor} flex justify-center items-center w-[110px] py-1.5 border-2 ${borderColor} font-semibold lg:text-xl`}
								onClick={() => {
									handleAccept(data["mobileNo"]);
								}}>
								{title === "delevering" ? (
									<img className="w-20 h-12" src={loading} />
								) : (
									title
								)}
							</button>
						)}
					</div>
				</div>

				{showDetails && (
					<div className="m-0 xl:m-9">
						<table className="w-full border-collapse">
							<thead>
								<tr>
									<th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">
										#
									</th>
									<th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">
										Item Name
									</th>
									<th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">
										Qty
									</th>
									<th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">
										Unit Price
									</th>
									<th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{title === "PAID" || title === "DELETE"
									? paidItems.map((item, index) => (
											<tr key={index}>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													{index + 1}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													{item.name}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													{item.totalQuantity}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													Rs.{item.price}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													Rs.{item.totalPrice}
												</td>
											</tr>
									  ))
									: items.map((item, index) => (
											<tr key={index}>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													{index + 1}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													{item.itemName}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													{item.quantity}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													Rs.{item.price}
												</td>
												<td className="border-b border-gray-200 px-2 py-1 xl:py-2">
													Rs.{item.price * item.quantity}
												</td>
											</tr>
									  ))}
							</tbody>
						</table>

						<div
							className={`${
								data.status == "accept" || data.status == "delivered"
									? "flex justify-between mt-6 text-lg lg:text-xl xl:text-2xl w-full "
									: "flex justify-end mt-6 text-lg lg:text-xl xl:text-2xl w-full  "
							}`}>
							<span
								className={`${
									data.status == "accept" || data.status == "delivered"
										? "text-red-600 text-base"
										: "hidden"
								}`}>
								Accept by: {data.waiterName} -{data.waiterID}
							</span>
							<span className="font-semibold">TOTAL: Rs.{data.total}</span>
						</div>

						{data.status === "pending" && (
							<div className="pt-4 flex justify-end">
								<button
									className={`${buttonColor} px-4 py-1.5 border-none text-white font-semibold lg:text-xl`}
									onClick={()=>{handleReject(data.orderID,data.time)}}>
									DECLINE
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};
