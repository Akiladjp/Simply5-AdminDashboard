import { useState } from 'react'
import { Link } from 'react-router-dom'


import { MdFastfood } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { CgSandClock } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";


function Navbar() {
  const Menus = [
    {icon:<MdFastfood/>, path:"/Waiter/pending-orders"},
    {icon:<CgSandClock/> , path:"/Waiter/accepted-orders"},
    {icon:<FaCircleCheck/> , path:"/Waiter/all-orders"},
    {icon:<CgProfile/> , path:"/Waiter/profile"},
  ]

  const [active, setActive] = useState(0)
  
  return (
    <div className="bottom-0 bg-[#007FA8] text-white fixed w-full md:h-24 h-[68px] ">
      <div className="flex w-full h-full">
        <ul className="flex w-full h-full">
          {
            Menus.map((menu,i)=>(
              <li key={i} className={`flex flex-col items-center justify-center w-1/4 hover:bg-[#056A8B] duration-100 ${i === active && "bg-white hover:bg-white "}`}>
                <Link
                  to={menu.path}
                  className="flex flex-col items-center w-full h-full"
                  onClick={() => setActive(i)}
                >
                  <span className={`text-[33px] md:text-5xl md:mt-6 mt-4 cursor-pointer duration-500 ${i === active && "text-[#007FA8]"}`}>
                    {menu.icon}
                  </span>
               </Link>
              </li>
            ))
          }  
        </ul>
      </div>
    </div>
  )
}

export default Navbar
