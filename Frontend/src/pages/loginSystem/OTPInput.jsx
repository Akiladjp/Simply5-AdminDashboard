import React, { useEffect, useState, createRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

function OTPInput() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [values, setValues] = useState({
    email: "",
  });

  const location = useLocation();
  const state = location.state;
  const email = state.some;

  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);

  const inputRefs = [createRef(), createRef(), createRef(), createRef()];

  function resendOTP() {
    navigate("/forgotpassword");
  }

  const handleInputChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtpInput = [...OTPinput];
      newOtpInput[index] = value;
      setOTPinput(newOtpInput);

      if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Backspace" && !OTPinput[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  const verfiyOTP = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/otp`, [email, OTPinput])
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/resetpassword", { state: { some: email } });
        } else {
          alert("OTP is incorrect");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
        <div>
            <Header />
        </div>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
        <div className="w-full max-w-lg px-6 pt-10 mx-auto bg-white shadow-xl pb-9 rounded-2xl">
          <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="text-3xl font-semibold">
                <p>Email Verification </p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email</p>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto mb-4">
                {OTPinput.map((_, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    maxLength="1"
                    type="text"
                    className="flex flex-col items-center justify-center w-16 h-16 px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-[rgb(0,127,168)]"
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyPress(e, index)}
                    value={OTPinput[index]}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    className="flex flex-row items-center justify-center w-full py-5 text-sm text-center text-white bg-[rgb(0,127,168)] border border-none shadow-sm outline-none cursor-pointer rounded-xl"
                    onClick={verfiyOTP}
                  >
                    Verify Account
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center space-x-1 text-sm font-medium text-center text-gray-500">
                  <p>Did not recieve code?</p>{" "}
                  <a
                    className="flex flex-row items-center"
                    style={{
                      color: disable ? "gray" : "blue",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={() => resendOTP()}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPInput;
