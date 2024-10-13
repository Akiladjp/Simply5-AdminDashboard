import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
function Login() {
	const navigate = useNavigate();
	const [data, setdata] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setdata((data) => ({ ...data, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("http://localhost:8081/adminlogin", data);

			if (res.data.Login) {
				sessionStorage.setItem("email", res.data.email);
				sessionStorage.setItem("role", res.data.role);
				console.log(res.data.redirectURL);
				navigate(res.data.redirectURL); // Redirect the URL
			} else {
				toastr.warning(res.data.Message);
			}
		} catch (err) {
			console.error("Error during login:", err);
		}
	};

	useEffect(() => {
		if (sessionStorage.getItem("email")) {
			if (sessionStorage.getItem("role") === "Waiter") {
				navigate("/Waiter/pending-orders");
			} else {
				navigate("/app/order/pending");
			}
		} else {
			navigate("/");
		}
	}, []);

	return (
		<div className="">
			<Header />
			<div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
				<div className="mx-auto">
					<div className="flex justify-center mt-14">
						<img src={logo} alt="Logo" />
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-10">
							<input
								required
								placeholder="Email"
								type="text"
								name="email"
								onChange={handleChange}
								value={data.email}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(81,191,228)] sm:text-sm sm:leading-6 px-3 outline-none"
							/>
						</div>

						<div className="mb-6">
							<input
								required
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								value={data.password}
								className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(81,191,228)] sm:text-sm sm:leading-6 px-3 outline-none"
							/>
							<input
								type="submit"
								value="Submit"
								className="flex w-full justify-center rounded-md bg-[rgb(0,127,168)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(81,191,228)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(81,191,228)] cursor-pointer mt-8"
							/>

							<Link
								to="/forgotpassword"
								className="flex text-sm leading-6 text-gray-900 pt-1.5 font-medium mb-4 justify-end mt-2">
								Update Your Password?
							</Link>

							<div className="text-[8px] text-center">
								<p className="mt-16 text-black">
									By signing in or creating an account, you agree with our{" "}
									<span className="text-blue-500 underline">
										Terms & conditions
									</span>{" "}
									and{" "}
									<span className="text-blue-500 underline">
										Privacy statement
									</span>
								</p>
								<p className="text-black">All rights reserved</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
