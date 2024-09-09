import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function ForgotPassword() {
  const [values, setValues] = useState({
    email: "",
  });

  const navigate = useNavigate();

 // axios.defaults.withCredentials = true;

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/forget-password", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/api/otp", { state: { some: values.email } });
        }else{
          alert('Email is not correct. Check again.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
        <Header />
    <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-32 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Forgot Password
        </h2>
        <form
        onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              // value={inputValue}
              onChange={handleInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[rgb(0,127,168)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Send 
          </button>
            
        </form>
        
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
