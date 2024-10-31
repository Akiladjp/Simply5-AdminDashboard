import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import { IoIosPricetags } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

export default function UpdateItem() {
	const navigate = useNavigate();
	const { itemID } = useParams();
	const [loading, setLoading] = useState(false);
	const [initialData, setInitialData] = useState({
		name: "",
		category: "",
		sub_category: "",
		price: "",
		prepare_time: "",
		description: "",
		new_image: "", // File for the new image
		Pre_imageUrl: "",
		image_path: "", // URL for the previous image
	});
	console.log(initialData);
	const [data, setData] = useState(initialData);
	const [imagePreview, setImagePreview] = useState(""); // URL for image preview
	const [fileName, setFileName] = useState("");

	useEffect(() => {
		const fetchItemData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8081/updateItem/${itemID}`
					,{withCredentials:true}
				);

				if (response.data.preeItem) {
					const item = response.data.preeItem[0];
					const fetchedData = {
						name: item.name || "",
						category: item.category || "",
						sub_category: item.sub_category || "",
						price: item.price || "",
						prepare_time: item.prepare_time || "",
						description: item.description || "",
						new_image: "",
						image_path: "", // Reset new_image for the update
					};
					setInitialData(fetchedData);
					setData(fetchedData);
					setImagePreview(item.image_url["url"]); // Set initial preview
				}
			} catch (error) {
				console.error("Error fetching item data:", error);
			}
		};

		fetchItemData();
	}, [itemID]);

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
			const file = files[0];
			console.log(files[0]);
			setImagePreview(URL.createObjectURL(file)); // Preview the image
			setFileName(file.name);
			setData((prevData) => ({ ...prevData, new_image: file })); // Store the file directly
		} else {
			setData((prevData) => ({ ...prevData, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate required fields
		if (!data.name || !data.category) {
			toastr.warning("Please fill out both the name and category.");
			return;
		}

		// Check if the form has been changed
		const modifiedData = { ...data };
		delete modifiedData.Pre_imageUrl; // Exclude previous image URL from submission

		if (
			JSON.stringify(initialData) === JSON.stringify(modifiedData) &&
			!data.new_image
		) {
			toastr.warning("No changes have been made to the form.");
			return;
		}

		setLoading(true);
		const formData = new FormData();

		// Append fields to FormData, excluding Pre_imageUrl
		console.log(modifiedData);
		Object.entries(modifiedData).forEach(([key, value]) => {
			if (key !== "Pre_imageUrl") {
				formData.append(key, value);
			}
		});

		console.log(data.new_image);
		try {
			const res = await axios.put(
				`http://localhost:8081/updateItem/${itemID}`,
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.data.message === "success") {
				toastr.success("Update Successful");
				// Navigate based on the updated category
				if (data.category === "Meal") {
					navigate("/app/items/meals");
				} else if (data.category === "Drinks") {
					navigate("/app/items/drinks");
				} else {
					navigate("/app/items/desserts");
				}
			} else {
				toastr.error(`Error: ${res.data.message}`);
			}
		} catch (error) {
			console.error("Error during update:", error);
			toastr.error(
				"An error occurred while updating the item. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		// Navigate back based on the item's category
		if (data.category === "Meal") {
			navigate("/app/items/meals");
		} else if (data.category === "Drinks") {
			navigate("/app/items/drinks");
		} else {
			navigate("/app/items/desserts");
		}
	};

	return (
		<div className="flex justify-center w-full p-1 mt-1 rounded-xl">
			<form
				className="w-3/4 lg:w-[35%] md:w-3/5 xl:w-[35%]"
				onSubmit={handleSubmit}
				encType="multipart/form-data">
				<div>
					<div
						className="flex justify-center items-center rounded-lg h-80 border-0 cursor-pointer w-full mb-8"
						onClick={() => document.querySelector(".input-field").click()}>
						<div className="text-center object-cover w-full overflow-hidden h-full flex items-center justify-center ">
							{imagePreview ? (
								<img
									src={imagePreview}
									alt={fileName}
									className="mb-4 rounded-md shadow-lg flex items-center justify-center text-center"
								/>
							) : (
								<div>No Image Selected</div>
							)}
							<input
								type="file"
								accept="image/*"
								onChange={handleChange}
								hidden
								className="input-field file:py-2 file:px-4 file:border-0 file:rounded-xl file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
								name="new_image"
								id="new_image"
							/>
						</div>
					</div>
				</div>

				{/* Input Fields */}
				<div className="flex justify-center">
					<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
						<label className="p-2 text-[#027297]">
							<GiMeal size="1.0rem" />
						</label>
						<input
							onChange={handleChange}
							type="text"
							placeholder="Food Name"
							value={data.name}
							name="name"
							className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						/>
					</div>
				</div>

				{/* Other Input Fields (Subcategory, Price, Time, Description) */}
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
					<label className="p-2 text-[#027297]">
						<BiSolidCategoryAlt size="1.0rem" />
					</label>
					<input
						onChange={handleChange}
						type="text"
						placeholder="Subcategory (optional)"
						value={data.sub_category}
						name="sub_category"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>

				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
					<label className="p-2 text-[#027297]">
						<IoIosPricetags size="1.0rem" />
					</label>
					<input
						onChange={handleChange}
						type="number"
						placeholder="Price (optional)"
						value={data.price}
						name="price"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>

				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
					<label className="p-2 text-[#027297]">
						<IoTime size="1.0rem" />
					</label>
					<input
						onChange={handleChange}
						type="number"
						placeholder="Delivery Time"
						value={data.prepare_time}
						name="prepare_time"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>

				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
					<label className="p-2 text-[#027297]">
						<MdDescription size="1.0rem" />
					</label>
					<textarea
						onChange={handleChange}
						type="text"
						placeholder="Description (optional)"
						value={data.description}
						name="description"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-center mt-6">
					<button
						type="button"
						onClick={handleCancel}
						className="py-2 px-4 bg-gray-400 text-white  mr-3 hover:bg-red-500 ">
						Cancel
					</button>
					<button
						type="submit"
						className="py-2 px-4 bg-blue-600 text-white  hover:bg-blue-900"
						disabled={loading}>
						{loading ? "Updating..." : "Update Item"}
					</button>
				</div>
			</form>
		</div>
	);
}
