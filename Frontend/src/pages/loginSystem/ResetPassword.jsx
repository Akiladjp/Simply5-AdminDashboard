import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";

function ResetPassword() {
  const [values, setValues] = useState({
    password: "",
    confirmpassword: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const state = location.state;
  const email = state.some;

  console.log(email);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  console.log(values);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

   
    if (!passwordVal.test(values.password)) {
      setErrorMessage(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 6 characters long."
      );
      return;
    }

    // Check if passwords match
    if (values.password !== values.confirmpassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(`${API_URL}/resetpassword`, [
        email,
        values.password,
      ]);
      if (response.data.Status === "Success") {
        console.log("Password changed successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      setErrorMessage("Error during reset password. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-32 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Enter New Password
          </h2>
          {errorMessage && (
            <div className="mt-2 text-center text-red-500">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="••••••••"
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[rgb(0,127,168)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
