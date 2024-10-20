import axios from "axios";
import React, { useState } from "react";

export const OrderCard = ({ data, onDelete, onAccept, title, buttontextColor,borderColor,buttonColor }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  // Parse the items JSON string if it exists
  const items = data.items ? JSON.parse(data.items) : [];

  const handleDelete = () => {
    axios.delete(`http://localhost:8081/orderdelete/${data.orderID}`,{withCredentials:true})
      .then(() => {
        if (onDelete) {
          onDelete(data.orderID);
        }
      })
      .catch(err => console.error("Error deleting the order:", err));
  };

  const handleAccept = () => {
    console.log("in handle Accept");
    axios.put(`http://localhost:8081/orderaccept/${data.orderID}`, {}, { withCredentials: true }) // Note the empty object for data payload
      .then(() => {
        if (onAccept) {
          onAccept(data.orderID);
        }
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div className="border-[rgb(0,127,168)] border-[1px] px-4 w-full p-2 relative">
      <div className="grid grid-cols-12 items-center py-2 gap-4">
        <div className="col-span-1 flex items-center justify-center w-10 h-10 bg-[#007FA8] rounded-full lg:w-12 lg:h-12 xl:w-14 xl:h-14">
          <p className="text-md font-medium text-white lg:text-xl xl:text-2xl">
            {data.tableNo}
          </p>
        </div>

        <div className="col-span-1 text-center font-semibold lg:text-xl xl:text-2xl">
          {data.orderID}
        </div>

        <div className="col-span-3 xl:col-span-2">
          <p className="font-semibold lg:text-xl xl:text-2xl">{data.userName}</p>
          <p className="font-medium text-sm lg:text-base xl:text-xl">
            0{data.mobileNo}
          </p>
        </div>

        <div className="col-span-2 xl:col-span-1 text-center font-semibold lg:text-xl xl:text-2xl">
          Rs.{data.total}/=
        </div>

        <div className="col-span-5 xl:col-span-7 flex gap-2 justify-end">
          <button
            className="bg-white px-6 py-1 border-[rgb(0,127,168)] border-2 text-[rgb(0,127,168)] font-semibold lg:text-xl"
            onClick={toggleDetails}
          >
            {showDetails ? "HIDE" : "VIEW"}
          </button>
          {data.status !== 'paid' && (
            <button
              className={`${buttontextColor} ${buttonColor} w-[110px] py-1.5 border-2 ${borderColor} font-semibold lg:text-xl`}
              onClick={handleAccept}
            >
              {title}
            </button>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="m-0 xl:m-9">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">#</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">Item Name</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">Qty</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">Unit Price</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 xl:py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200 px-2 py-1 xl:py-2">{index + 1}</td>
                  <td className="border-b border-gray-200 px-2 py-1 xl:py-2">{item.itemName}</td>
                  <td className="border-b border-gray-200 px-2 py-1 xl:py-2">{item.quantity}</td>
                  <td className="border-b border-gray-200 px-2 py-1 xl:py-2">Rs.{item.price}</td>
                  <td className="border-b border-gray-200 px-2 py-1 xl:py-2">Rs.{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6 text-lg lg:text-xl xl:text-2xl">
            <span className="font-semibold">TOTAL: Rs.{data.total}</span>
          </div>

          {data.status === 'pending' && (
            <div className="pt-4 flex justify-end">
              <button
                className={`${buttonColor} px-4 py-1.5 border-none text-white font-semibold lg:text-xl`}
                onClick={handleDelete}
              >
                DECLINE
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
