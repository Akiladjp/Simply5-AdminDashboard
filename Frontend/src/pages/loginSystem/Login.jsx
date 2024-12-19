import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { selectRole, selectToken, setLoginValue } from "../../Redux/Slices/LogiinSlice";
function Login() {
	const API_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const role = useSelector(selectRole)
	const isSetToken = useSelector(selectToken);
	const [data, setdata] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/login-validation`, {
							withCredentials: true,
						});
            console.log("response:", response.data.message);

            if (response.data.message === "Token is valid") {
                if (role === "Waiter") {
                    navigate("/Waiter/pending-orders");
                } else {
                    navigate("/app/order/pending");
                }
            } else {
                console.error("Unexpected response message:", response.data.message);
            }
        } catch (err) {
            if (err.response) {
                // Server responded with a status outside the 2xx range
                console.error("Server error:", err.response.data.message || "Unknown error");
            } else if (err.request) {
                // Request was made but no response was received
                console.error("Network error: No response from server");
            } else {
                // Something else happened
                console.error("Unexpected error:", err.message);
            }
        }
    };

    if (isSetToken) {
        fetchData();
    }
}, [isSetToken, role, navigate]);

	const handleChange = (e) => {
		setdata((data) => ({ ...data, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		try {
			const res = await axios.post(`${API_URL}/adminlogin`, data, {
				withCredentials: true,
			});
			console.log("login response", res);
	
			if (res.data.Login) {
				// Update state with login values
				dispatch(
					setLoginValue({
						email: res.data.email,
						role: res.data.role,
						token: true,
					})
				);
	
				// Navigate to the redirect URL
				console.log("Redirecting to:", res.data.redirectURL);
				navigate(res.data.redirectURL);
			} else {
				// Handle messages returned by the backend
				toastr.warning(res.data.Message || "Login failed!");
			}
		} catch (err) {
			// Network or unexpected errors
			if (err.response) {
				// Errors returned by the server
				console.error("Server error:", err.response.data);
				toastr.error(err.response.data.Message || "An error occurred on the server.");
			} else if (err.request) {
				// No response received
				console.error("Network error:", err.request);
				toastr.error("No response from the server. Please check your network.");
			} else {
				// Other unexpected errors
				console.error("Error during login:", err.message);
				toastr.error("An unexpected error occurred. Please try again.");
			}
		}
	};
	
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
								type="email"
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
								value="LOGIN"
								className="flex w-full justify-center rounded-md bg-[rgb(0,127,168)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(81,191,228)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(81,191,228)] cursor-pointer mt-8"
							/>

							<Link
								to="/forgotpassword"
								className="flex text-sm leading-6 text-gray-900 pt-1.5 font-medium mb-4 justify-end mt-2">
								Update Password?
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
