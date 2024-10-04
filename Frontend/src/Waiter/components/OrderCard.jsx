import axios from "axios";

import { useState } from "react";
// import Stopwatch from "./OrderTimer";

function OrderCard({ data, onDelete, onAccept, title }) {
	// Function to render buttons based on the status
	if (!data) {
		return null; // Return nothing if data is undefined
	}

	const items = data.items ? JSON.parse(data.items) : [];

	const handleDelete = () => {
		console.log("in delete");
		if (onDelete) {
			onDelete(data.orderID);
		}
	};

	const handleAccept = () => {
		console.log("in accept");
		axios
			.put(`http://localhost:8081/orderaccept/${data.orderID}`)
			.then(() => {
				if (onAccept) {
					onAccept(data.orderID);
					
				}
			})
			.catch((err) => console.log(err));
	};

	// const handleAcceptOrder = () => {
	//   const currentTimestamp = new Date();
	//   setStartTimestamp(currentTimestamp);
	//   navigate('/order-timer');
	// };
	const time = new Date();
	time.setSeconds(time.getSeconds() + 0);

	const renderButtons = () => {
		switch (data.status) {
			case "pending":
				return (
					<>
						<div className="">
							<button
								className="px-1 py-1 text-sm font-medium text-[#007FA8]  rounded-none  border-[#007FA8] border-[1px] bg-white md:text-lg md:p-1 md:px-4"
								onClick={handleAccept}>
								ACCEPT
							</button>
							<button
								className="px-[8px] py-1 text-sm font-medium text-white  rounded-none  border-[#007FA8] border-[1px] bg-[#007FA8]  md:text-lg md:ml-4  md:px-5 ml-2"
								onClick={handleDelete}>
								DELETE
							</button>
						</div>
					</>
				);
			case "accept":
				return (
					<button
						className="px-[12px] py-1 text-sm font-medium text-white  rounded-none  border-[#007FA8] border-[1px] bg-[#007FA8]  md:text-lg md:ml-4  md:px-6 ml-2"
						onClick={handleAccept}>
						DONE
					</button>
				);
			case "delivered":
				return (
					<button
						className="px-[8px] py-1 text-sm font-medium text-white  rounded-none  border-[#007FA8] border-[1px] bg-[#007FA8]  md:text-lg md:ml-4  md:px-5 ml-2"
						onClick={handleDelete}>
						DELETE
					</button>
				);
			default:
				return null;
		}
	};

	return (
		<div className="flex justify-center">
			<div className="w-11/12 h-auto pt-4 pb-4 pl-4 pr-2 md:pt-6 md:pl-6 md:pb-6 md:pr-[17px] rounded-none border-[#007FA8] border-[1px] md:w-10/12 relative">
				<div className="flex ">
					<div className="flex gap-4 md:gap-8 ">
						<div className="bg-[#007FA8] rounded-full item-center justify-center w-6 h-6  md:w-8 md:h-8 text-center">
							<p className="w-full  text-xs md:text-sm font-medium text-white place-items-center mt-[4px] md:mt-[6px] items-center justify-center flex text-center">
								{data.tableNo}
							</p>
						</div>
						<div className="text-sm font-semibold md:text-lg mt-[3px]">
							<p>{data.userName}</p>
						</div>
					</div>
					<div className="ml-auto ">{renderButtons()}</div>
				</div>
				{items.map((item, index) => (
					<div
						className="flex mt-4 ml-[4px] md:mt-6 border-b-[1px] border-gray-300  "
						key={index}>
						<div className="flex gap-4 md:gap-8 mb-2">
							<p className=" text-xs md:text-lg place-items-center mt-[2px] text-black font-semibold">
								{index + 1}
							</p>
							<p className="text-sm font-semibold md:text-lg">
								{item.itemName}
							</p>
						</div>
						<div className="flex gap-8 ml-auto mr-8 md:gap-10 md:mr-36">
							<p className="text-sm font-semibold md:text-lg">
								{item.quantity}
							</p>
							<p className="text-sm font-semibold md:text-lg"></p>
						</div>
					</div>
				))}
				<div className={`${data.status === "accept" || data.status=="delivered" ? "flex" : "hidden"}`}>
					{/* <Stopwatch orderID={data.orderID} /> */}
				</div>
			</div>
		</div>
	);
}

export default OrderCard;
