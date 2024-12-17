import React, { useEffect, useRef, useState } from "react";
import { GiMeal } from "react-icons/gi";
import { BiSolidCategoryAlt, BiSolidCloudUpload } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import loadingGif from "../../assets/loading.gif";
function MealsForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const API_URL = import.meta.env.VITE_API_URL;
	const [subCategory, setSubcategory] = useState([]);
	const categoryFromLocation = location.state?.category;
	const [isFocused, setIsFocused] = useState(false);
	const categoryFromParams = params.category;
	const category = categoryFromLocation || categoryFromParams;
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [fileName, setFileName] = useState(["No selected file"]);
	const dropdownRef = useRef(null);
	const [data, setData] = useState({
		name: "",
		category: "",
		sub_category: "",
		price: "",
		prepare_time: "",
		description: "",
		image: "",
	});

	const handleFocus = () => {
		setIsFocused(true); // Show the list when input is focused
	};

	const handleSelectCat = (category) => {
		setIsFocused(false);
		setData((prevData) => ({ ...prevData, sub_category: category }));
	};
	console.log(category);
	useEffect(() => {
		const fetchData = async () => {
			try {
				
				const response = await axios.get(
					`${API_URL}/get_subCategory/${category}`,
					{ withCredentials: true }
				);
				if (response) {
					setSubcategory(response.data.sub_category);
				}
			} catch (err) {
				console.log("server error", err);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsFocused(false); // Hide dropdown when clicking outside
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setImage(URL.createObjectURL(files[0]));
			setData((prevData) => ({ ...prevData, image: files[0] }));
			setFileName(files[0].name);
		} else {
			setData((prevData) => ({ ...prevData, [name]: value, category }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if the image is selected
		if (!data.image) {
			toastr.error("Please select an image to upload.");
			return; // Prevent form submission
		}
		setLoading(true);
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		try {
			const res = await axios.post(
				`${API_URL}/additemevalues`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.data.message === "Success") {
				toastr.success("Image and item uploaded successfully.", {
					timeOut: 3000,
				});
				navigate(`/app/items/${category.toLowerCase()}`);
			} else {
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
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		navigate(`/app/items/${category.toLowerCase()}`);
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
								name="image"
								id="image"
								value=""
								type="file"
								accept="image/*"
								onChange={handleChange}
								hidden
								className="input-field file:py-2 file:px-4 file:border-0 file:rounded-xl file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
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
				<div
					className="flex justify-center w-full py-1 mb-5 rounded-md border-0 text-black ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 flex-col"
					ref={dropdownRef}>
					<div className="w-full flex shadow-sm shadow-[rgb(81,191,228)] ">
						<label className="p-2 text-[#027297] " htmlFor="">
							<BiSolidCategoryAlt size="1.0rem" />
						</label>
						<input
							required
							onChange={handleChange}
							type="text"
							placeholder="  Sub category"
							name="sub_category"
							className="w-full py-1 ml-1 rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black "
							onClick={handleFocus}
							value={data.sub_category}
						/>
					</div>

					<div>
						{isFocused && (
							<ul className="w-full   h-auto float-end flex flex-col  gap-y-1 ">
								{subCategory
									.filter((category) =>
										category
											.toLowerCase()
											.includes(data.sub_category.toLowerCase())
									) // Filter based on input
									.map((category, index) => (
										<li
											key={index}
											className="w-[92%] list-none hover:bg-blue-200 cursor-pointer text-gray-800 ml-[8%]"
											onClick={() => {
												handleSelectCat(category);
											}}>
											{category}
										</li>
									))}
							</ul>
						)}
					</div>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297] " htmlFor="">
						<IoIosPricetags size="1.0rem" />
					</label>
					<input
						required
						onChange={handleChange}
						type="number"
						placeholder=" Price"
						name="price"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297] " htmlFor="">
						<IoTime size="1.0rem" />
					</label>
					<input
						required
						onChange={handleChange}
						type="text"
						placeholder="Preparation Time (min)"
						name="prepare_time"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297] " htmlFor="">
						<MdDescription size="1.0rem" />
					</label>
					<textarea
						required
						onChange={handleChange}
						type="text"
						placeholder="Description"
						name="description"
						rows="3"
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
					/>
				</div>
				<div className="flex justify-center mb-10 flex-row-reverse gap-x-12 items-center">
					<button
						type="submit"
						className="bg-blue-600 text-white w-20 justify-center py-2 px-4 h-12 flex items-center rounded-md hover:bg-blue-800 transition duration-300"
						disabled={loading}>
						{loading ? <img src={loadingGif} className="w-16 " /> : "ADD"}
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="bg-red-600 h-12 text-white py-2 px-4 rounded-md hover:bg-red-800 transition duration-300 ml-4">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default MealsForm;
