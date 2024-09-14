import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { MdFastfood } from "react-icons/md";
import { PiChartBarFill } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";

export default function Sidebar() {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const storedActiveButton = localStorage.getItem('activeButton');
    const storedActiveMenuItem = localStorage.getItem('activeMenuItem');
    const storedActiveDropdown = localStorage.getItem('activeDropdown');

    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
    if (storedActiveMenuItem) {
      setActiveMenuItem(storedActiveMenuItem);
    }
    if (storedActiveDropdown) {
      setActiveDropdown(storedActiveDropdown);
    }
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/app/order')) {
      setActiveButton('order');
      setActiveDropdown('order');
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 3) {
        setActiveMenuItem(pathParts[3]);
      }
    } else if (location.pathname.startsWith('/app/items')) {
      setActiveButton('items');
      setActiveDropdown('items');
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 3) {
        setActiveMenuItem(pathParts[4]?.substring(1,10).toLowerCase() || pathParts[3]);
        //console.log(aa)
      }
    } else if (location.pathname.startsWith('/app/offers')) {
      setActiveButton('offers');
    }else if (location.pathname.startsWith('/app/analysis')) {
      setActiveButton('analysis');
      setActiveDropdown('analysis');
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 3) {
        const firstFourChars = pathParts[3].substring(0, 4);
        console.log(firstFourChars)
        setActiveMenuItem(firstFourChars);
      }
    } else if (location.pathname.startsWith('/app/employers')) {
      setActiveButton('employers');
    }
  }, [location.pathname]);

  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
      setActiveButton(null);
      localStorage.removeItem('activeButton');
      localStorage.removeItem('activeDropdown');
    } else {
      setActiveDropdown(menu);
      setActiveButton(menu);
      localStorage.setItem('activeButton', menu);
      localStorage.setItem('activeDropdown', menu);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    localStorage.setItem('activeMenuItem', menuItem);
  };

  const getMenuItemClass = (menuItem) => 
    `block py-1 px-4 rounded mb-1 ${activeMenuItem === menuItem ? 'bg-white text-[#007FA8]' : 'text-white'}`;

  const getButtonClass = (button) => 
    `relative p-4 ${activeButton === button ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'}`;

  return (
    <div className="fixed top-16 left-0 w-[20%] lg:w-[16%] xl:w-[12%] h-[screen-64px] text-white tracking-wide ">
      <div className="flex flex-col gap-8 mt-6 ">
        {/*side bar order*/}
        <div className={` p-4 ${activeButton === 'order' ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'} `}>
          <button
            onClick={() => toggleDropdown('order')}
            className="flex items-center w-full pr-12 text-base font-medium lg:text-lg"
          >
            <FaUtensils className="mr-2" />
            ORDER
          </button>
          {activeDropdown === 'order' && (
            <div className="p-2 pb-0 mt-2 ml-6 text-sm border-l-2 border-white ">
              <Link
                to="/app/order/pending"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'pending' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('pending')}
              >
                PENDING
              </Link>
              <Link
                to="/app/order/accept"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'accept' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('accept')}
              >
                ACCEPT
              </Link>
              <Link
                to="/app/order/paid"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'paid' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('paid')}
              >
                PAID
              </Link>
            </div>
          )}
        </div>

        {/*side bar items*/}
        <div className={`relative p-4 ${activeButton === 'items' ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'}`}>
          <button
            onClick={() => toggleDropdown('items')}
            className="flex items-center w-full pr-12 text-base font-medium lg:text-lg"
          >
            <MdFastfood className="mr-2" />
            ITEMS
          </button>
          {activeDropdown === 'items' && (
            <div className="p-2 pb-0 mt-2 ml-6 text-sm border-l-2 border-white lg:text-base">
               <Link
                to="/app/items/meals"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'meals' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('meals')}
              >
                MEALS
              </Link>
              <Link
                to="/app/items/drinks"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'drinks' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('drinks')}
              >
                DRINKS
              </Link>
              <Link
                to="/app/items/desserts"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'desserts' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('desserts')}
              >
                DESSERTS
              </Link>
            </div>
          )}
        </div>

        {/*side bar offers*/}
        <div className={`relative p-4 ${activeButton === 'offers' ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'}`}>
          <Link 
            to="/app/offers"
            className="flex items-center w-full text-base font-medium lg:text-lg"
            onClick={() => {
              setActiveButton('offers');
              handleMenuItemClick('');
              setActiveDropdown(null);
            }}
          >
            <BiSolidOffer className="mr-2" />
            OFFERS
          </Link>
        </div>

        {/*side bar analysis*/}
        <div className={`relative p-4 ${activeButton === 'analysis' ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'}`}>
          <button
            onClick={() => toggleDropdown('analysis')}
            className="flex items-center w-full pr-4 text-base font-medium lg:text-lg"
          >
            <PiChartBarFill className="mr-2" />
            ANALYSIS
          </button>
          {activeDropdown === 'analysis' && (
            <div className="p-2 pb-0 mt-2 ml-6 text-sm border-l-2 border-white lg:text-base">
              <Link
                to="/app/analysis/todayitem"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'toda' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('today')}
              >
                TODAY
              </Link>
              <Link
                to="/app/analysis/weekitem"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'week' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('week')}
              >
                WEEK
              </Link>
              <Link
                to="/app/analysis/monthitem"
                className={`block py-1 px-2 rounded mb-1 ${
                  activeMenuItem === 'mont' ? 'bg-white text-[#007FA8]' : 'text-white'
                }`}
                onClick={() => handleMenuItemClick('month')}
              >
                MONTH
              </Link>
            </div>
          )}
        </div>

        {/*side bar employers*/}
        <div className={`relative p-4 ${activeButton === 'employers' ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'}`}>
          <Link 
            to="/app/employers/employee"
            className="flex items-center w-full text-base font-medium lg:text-lg"
            onClick={() => {
              setActiveButton('employers');
              handleMenuItemClick('');
              setActiveDropdown(null);
            }}
          >
            <GrUserWorker className="mr-2" />
            EMPLOYEES
          </Link>
        </div>

        {/*side bar logout*/}
        <div className={`relative p-4 ${activeButton === 'logout' ? 'bg-[#027297] hover:bg-[#056A8B]' : 'bg-[#007FA8] hover:bg-[#056A8B]'}`}>
         <Link to="/app/logout">
          <button 
            className="flex items-center w-full pr-1 text-base font-medium lg:text-lg lg:pr-3">
            <IoIosLogOut className="mr-2" />
              LOG OUT
          </button>
              </Link>
        </div>
      </div>
    </div>
  );
}
