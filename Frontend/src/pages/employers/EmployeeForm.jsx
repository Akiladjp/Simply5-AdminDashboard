import UpdateEmployee from "./UpdateEmployee";

import { FaPhone } from "react-icons/fa6";
import { MdCake } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
function EmployeeForm() {
	const navigate = useNavigate();
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState(["No selected file"]);

	const [data, setData] = useState({
		name: "",
		position: "",
		phoneNo: "",
		NIC: "",
		birthDate: "",
		joinedDate: "",
		address: "",
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
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		try {
			const res = await axios.post(
				"http://localhost:8081/employeeform",

				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.data.message === "success") {
				alert("Image uploaded successfully.");
				navigate("/app/employers/employee");
			} else if (res.data.message === "error in uploading to database") {
				alert("Error in uploading to database.");
			} else {
				navigate("/app/employers/employee");
			}

			console.log(res);
		} catch (err) {
			console.error("Error during form submission:", err);
			alert("An error occurred during form submission. Please try again.");
		}
	};

	const [birthDateType, setBirthDateType] = useState("text");
	const [joinedDateType, setJoinedDateType] = useState("text");

	const handleBirthDateFocus = () => setBirthDateType("date");
	const handleBirthDateBlur = () => {
		if (!data.birthDate) {
			setBirthDateType("text");
		} else {
			setBirthDateType("date");
		}
	};

	const handleJoinedDateFocus = () => setJoinedDateType("date");
	const handleJoinedDateBlur = () => {
		if (!data.joinedDate) {
			setJoinedDateType("text");
		} else {
			setJoinedDateType("date");
		}
	};

	return (
		<div className="flex justify-center w-full p-1 mt-1 rounded-xl">
			<form
				onSubmit={handleSubmit}
				className="lg:w-[35%] md:w-3/5 mt-4"
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
								type="file"
								accept="image/*"
								onChange={handleChange}
								hidden
								className="input-field file:py-2 file:px-4 file:border-0  file:rounded-xl file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
								required
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 mt-6 bg-white rounded-md text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]">
						<MdDriveFileRenameOutline size="1.0rem" />
					</label>
					<input
						type="text"
						placeholder="Name"
						name="name"
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]">
						<FaUserGroup size="1.0rem" />
					</label>
					<input
						type="text"
						placeholder="Position"
						name="position"
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]">
						<FaPhone size="1.0rem" />
					</label>
					<input
						type="number"
						placeholder="Phone Number"
						name="phoneNo"
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]">
						<BiSolidUserAccount size="1.0rem" />
					</label>
					<input
						type="text"
						placeholder="NIC"
						name="NIC"
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]" htmlFor="birthDate">
						<MdCake size="1.0rem" />
					</label>
					<input
						type={birthDateType}
						name="birthDate"
						value={data.birthDate}
						placeholder="Date of birth"
						onFocus={handleBirthDateFocus}
						onBlur={handleBirthDateBlur}
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]" htmlFor="joinedDate">
						<FaCalendarCheck size="1.0rem" />
					</label>
					<input
						type={joinedDateType}
						name="joinedDate"
						value={data.joinedDate}
						placeholder="Joined Date"
						onFocus={handleJoinedDateFocus}
						onBlur={handleJoinedDateBlur}
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center w-full py-1 mb-4 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3">
					<label className="p-2 text-[#027297]">
						<FaAddressCard size="1.0rem" />
					</label>
					<input
						type="text"
						placeholder="Address"
						name="address"
						onChange={handleChange}
						className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
						required
					/>
				</div>
				<div className="flex justify-center gap-8 p-5 lg:gap-16 md:gap-12 lg:mt-6">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="flex w-1/3 justify-center rounded-none bg-white border-[rgb(0,127,168)] border-[2px] px-1 py-1.5 text-sm font-semibold leading-6 text-[rgb(0,127,168)] shadow-sm">
						CANCEL
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

export default EmployeeForm;
