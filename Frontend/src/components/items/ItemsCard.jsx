import { MdAccessAlarms } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ItemCard({ data }) {
	const [buttonText, setButtonText] = useState(
		data.available ? data.available : "UNAVAILABLE"
	); // Initialize from data

	const navigate = useNavigate();

	useEffect(() => {
		// If necessary, fetch additional data or refresh availability on mount.
	}, []);

	const handleClick = () => {
		const newStatus = buttonText === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
		setButtonText(newStatus);
		updateDB(newStatus, data.itemID); // Pass the item ID
	};

	const updateDB = async (newStatus, id) => {
		try {
			const response = await axios.put(
				`http://localhost:8081/updateAvailable/${id}`,
				{
					available: newStatus,
				},
				{ withCredentials: true }
			);

			if (response.status === 200) {
				console.log("Status updated in database");
			} else {
				console.error("Failed to update status in database");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const ItemDelete = async (id) => {
		try {
			const response = await axios.delete(
				`http://localhost:8081/delete_item/${id}`,
				{ withCredentials: true }
			);
			if (response.data.message.includes("Error")) {
				alert(response.data.message);
			} else {
				window.location.reload(); // Reload after successful deletion
			}
		} catch (error) {
			console.error("Error deleting item:", error);
			throw error; // Handle the error if needed
		}
	};

	return (
		<div className="flex flex-col w-[237px] h-auto pb-2 overflow-hidden bg-white shadow-lg rounded-xl shadow-indigo-200">
			<div className="flex flex-col w-[237px] h-[194px] pb-2 overflow-hidden bg-white rounded-t-xl ">
				<img
					style={{ objectFit: "contain", backgroundPosition: "center" }}
					src={data.image_url}
					alt={`${data.name}'s image`}
				/>
			</div>

			<div className="flex flex-col items-start gap-2 p-2 ">
				<h1 className="font-bold text-md text-wrap">{data.name}</h1>
				<div className="flex items-center w-full gap-6">
					<div className="flex items-center gap-1 justify-end">
						<i className="text-green-700 ">
							<MdAccessAlarms fontSize="small" />
						</i>
						<p className="text-sm text-green-700">{data.prepare_time}</p>
					</div>
					<div className="flex items-center gap-1 justify-center">
						<i className="text-red-700">
							<IoIosStarOutline fontSize="small" />
						</i>
						<p className="text-sm text-red-700">{data.rate}</p>
					</div>
				</div>

				<div className="flex items-center justify-between w-full">
					<p className="text-sm font-semibold">Rs.{data.price}</p>
				</div>

				<div className="flex w-full ">
					<div className="flex items-center justify-between w-full">
						<button
							onClick={handleClick}
							className={`px-5 py-1 text-xs font-semibold text-white rounded border-[1px] ${
								buttonText === "AVAILABLE" ? "bg-green-600" : "bg-red-600"
							}`}>
							{buttonText}
						</button>

						<div className="flex items-center w-auto h-auto justify-center gap-x-4">
							<Link to={`/app/items/updateitem/${data.itemID}`}>
								<button className="flex h-auto">
									<RiEdit2Fill className="text-xl text-black bg-white rounded hover:bg-gray-400 hover:scale-2" />
								</button>
							</Link>
							<button onClick={() => ItemDelete(data.itemID)}>
								<RiDeleteBin5Line className="text-xl text-black bg-white rounded hover:bg-gray-400 " />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
