import React, { useEffect, useState } from "react";
import { GiMeal } from "react-icons/gi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiSolidCloudUpload } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

function MealsForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const [loading, setloading] = useState(false);
	const categoryFromLocation = location.state?.category;

	const categoryFromParams = params.category;

	const category = categoryFromLocation || categoryFromParams;
	console.log("category_value", category);

	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState(["No selected file"]);

	const [data, setData] = useState({
		name: "",
		category: "",
		sub_category: "",
		price: "",
		prepare_time: "",
		description: "",
		image: "",
	});

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setImage(URL.createObjectURL(files[0]));
			setData((prevData) => ({ ...prevData, image: files[0] }));
			setFileName(files[0].name);
		} else {
			setData((prevData) => ({ ...prevData, [name]: value }));
			setData((prevData) => ({ ...prevData, category: category }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		// Check if the image is selected

		try {
			const res = await axios.post(
				"http://localhost:8081/additemevalues",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.data.message === "Success") {
				console.log("message", res.data.message);

				// Success toast for image upload
				toastr.success("Image uploaded successfully.", {
					timeOut: 3000, // Increased timeout to 3 seconds
				});

				// Success toast for item upload
				toastr.success("Item uploaded successfully.", {
					timeOut: 3000, // Increased timeout
				});

				// Redirect based on category
				if (category === "Meals") {
					navigate("/app/items/meals");
				} else if (category === "Drinks") {
					navigate("/app/items/drinks");
				} else {
					navigate("/app/items/desserts");
				}
			} else if (res.data.message === "error in uploading to database") {
				toastr.error("Error in uploading to database.", {
					timeOut: 3000,
				});
			}
		} catch (err) {
			console.error("Error during form submission:", err);
			toastr.error(
				"An error occurred during form submission. Please try again.",
				{ timeOut: 3000 }
			);
		}
	};

	const handleCancel = () => {
		if (category === "Meals") {
			navigate("/app/items/meals");
		} else if (category === "Drinks") {
			navigate("/app/items/drinks");
		} else {
			navigate("/app/items/desserts");
		}
	};

	return (
		<div className="flex justify-center w-full p-1 mt-1 rounded-xl">
			<form
				className="w-3/4 lg:w-[35%] md:w-3/5 xl:w-[35%] mt-10"
				onSubmit={handleSubmit}
				encType="multipart/form-data">
				<div className="shadow-md rounded-lg ">
					<div
						className="flex justify-center items-center rounded-lg h-80 border-0 cursor-pointer w-full"
						onClick={() => document.querySelector(".input-field").click()}>
						<div className="text-center object-cover w-full overflow-hidden h-full flex items-center justify-center ">
							{image ? (
								<img
									src={image}
									alt={fileName}
									className="mb-4 rounded-md shadow-lg flex items-center justify-center text-center"
								/>
							) : (
								<div className="mb-5 flex flex-col items-center justify-center text-center">
									<BiSolidCloudUpload className="text-6xl text-black mb-4 bg-white p-2" />
									<p className="font-semibold text-black bg-white p-2 ">
										Upload image (JPG, PNG)
									</p>
								</div>
							)}
							<input
								required
								type="file"
								accept="image/*"
								onChange={handleChange}
								hidden
								className="input-field file:py-2 file:px-4 file:border-0  file:rounded-xl file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-8">
					<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
						<label className="p-2 text-[#027297] " htmlFor="">
							<GiMeal size="1.0rem" />
						</label>
						<input
							required
							onChange={handleChange}
							type="text"
							placeholder="  Food Name"
							name="name"
							className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						/>
					</div>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297] " htmlFor="">
						<BiSolidCategoryAlt size="1.0rem" />
					</label>
					<input
						required
						onChange={handleChange}
						type="text"
						placeholder="  Sub category"
						name="sub_category"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297] " htmlFor="">
						<IoIosPricetags size="1.0rem" />
					</label>
					<input
						required
						onChange={handleChange}
						type="decimal"
						placeholder="  Price"
						name="price"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]" htmlFor="">
						<IoTime size="1.0rem" />
					</label>
					<input
						required
						onChange={handleChange}
						type="text"
						placeholder="  Delivery time"
						name="prepare_time"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297] " htmlFor="">
						<MdDescription size="1.0rem" />
					</label>
					<input
						required
						onChange={handleChange}
						cols="30"
						rows="2"
						placeholder="  Description"
						name="description"
						className="w-full h-8 py-1 ml-1 bg-white rounded-md outline-none resize-none placeholder:text-black text-wrap placeholder:items-start"
					/>
				</div>

				<div className="flex justify-center gap-8 p-5 lg:gap-16 md:gap-12 lg:mt-8">
					<button
						onClick={handleCancel}
						className="flex w-1/3 justify-center rounded-none bg-white border-[rgb(0,127,168)] border-[2px] px-1 py-1.5 text-sm font-semibold leading-6 text-[rgb(0,127,168)] shadow-sm">
						Cancel
					</button>

					<button
						type={`${data["image"] ? "submit" : "button"}`}
						
						onClick={() => {
							if (!data["image"])
								toastr.error("Please select an image to upload.");
						}}
						className={`flex w-1/3 justify-center rounded-none px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cursor-pointer
          ${
						data["image"]
							? "bg-[rgb(0,127,168)] hover:bg-[rgb(81,191,228)]"
							: "bg-gray-400"
					}`}>
						Upload
					</button>
				</div>
			</form>
		</div>
	);
}

export default MealsForm;
