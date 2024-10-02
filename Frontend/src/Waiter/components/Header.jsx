import  { useEffect, useState } from 'react'
import sample_profile from '../../assets/chef.png'

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
      <div className="flex ml-3 h-full items-center">
          <img src={sample_profile} alt="" className='w-8 rounded-full' />
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
