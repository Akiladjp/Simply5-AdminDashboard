import  { useEffect, useState } from 'react'

function WaiterHeader() {

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
    <div className="bg-[#056A8B] text-white flex md:pb-4 md:pt-4 fixed w-full md:h-[70px] h-[55px] font-medium z-50">
      <div className="flex md:w-[70%] w-full  md:mt-[10px] mt-[18px] text-center ml-2 md:ml-4 tracking-wider md:text-xl text-sm">
          <h1>WAITER DASHBOARD</h1>
      </div>
      <div className="w-full ">
        <p className="md:mt-[15px] text-right md:mr-5 md:text-[16px] mt-[22px] mr-2 text-[11px] z-50">
          {currentDate.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default WaiterHeader
