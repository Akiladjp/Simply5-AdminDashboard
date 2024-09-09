import  { useState, useEffect } from "react";
import "../App.css";

export default function Header() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="bg-[#056A8B] text-white flex md:pb-4 md:pt-4 fixed w-full h-16 font-medium z-50">
      <div className="flex w-[70%] mt-1 text-center ml-4 tracking-wider text-xl">
          <h1>ADMIN DASHBOARD</h1>
      </div>
      <div className="w-full ">
        <p className="text-[0] text-right mt-1 mr-5 md:text-[16px] lg:text-[20px] z-50">
          {currentDate.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}
