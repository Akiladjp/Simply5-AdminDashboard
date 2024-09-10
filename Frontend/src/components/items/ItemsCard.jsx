import { MdAccessAlarms } from "react-icons/md";
 import { IoIosStarOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
//import Item from "../../../../Backend/Routes/Item/item";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";
import { useEffect } from "react";
export default function ItemCard({ data }) {
  const navigate = useNavigate();
  useEffect(() => {
   // console.log("data", data["category"]);
  }, []);
  const ItemDelete = async (id) => {
    try {
      const respones = await axios.delete(
        `http://localhost:8081/delete_item/${id}`
      );

      if (respones.data.message == "Error in image deletion") {
        alert("Error in image deletion");
      } else if (
        respones.data.message == "Error in deleting item from database"
      ) {
        alert("Error in deleting item from database");
      } else {
        // alert("Item Delete successfuly");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error; // or handle the error as needed
    }
  };
//dhanushka-->> meka remove krpn akila
  return (
    <div className="flex flex-col w-[237px] h-auto pb-2 overflow-hidden bg-white shadow-lg rounded-xl shadow-indigo-200">
      <div className="flex flex-col w-[237px] h-[194px] pb-2 overflow-hidden bg-white rounded-t-xl ">
        <img
          style={{ objectFit: "contain", backgroundPosition: "center" }}
          src={data.image_url}
          alt={`${data.name}'s image`}
        />
      </div>

      <div className="flex flex-col items-start gap-2 p-2 ">
        <h1 className="font-bold text-md text-wrap">{data.name}</h1>
        <div className="flex items-center w-full gap-6">
          <div className="flex items-center gap-1 justifey-end">
            <i className="text-green-700 ">
              <MdAccessAlarms fontSize="small" />
            </i>
            <p className="text-sm text-green-700">{data.prepare_time}</p>
          </div>
          <div className="flex items-center gap-1 justify-centr">
            <i className="text-red-700">
              <IoIosStarOutline fontSize="small" />
            </i>
            <p className="text-sm text-red-700">{data.rate}</p>
          </div>
        </div>
        {/* time and rating */}
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-semibold">Rs.{data.price}</p>
        </div>

        <div className="flex w-full ">
          <div className="flex items-center justify-between w-full">
            <button className="px-5 py-1 text-xs font-semibold text-black bg-white rounded border-black border-[1px]">
              AVAILABLE
            </button>
            <div className="flex items-center w-auto h-auto justifey-center gap-x-4">
            <Link to={`/app/items/updateitem/${data.itemID}`}>
                <button className="flex h-auto">
                  <RiEdit2Fill className="text-xl text-black bg-white rounded hover:bg-gray-400 hover:scale-2" />
                </button>
                {/* <DeleteOutlinedIcon/>  */}
              </Link>
              <button
                className=""
                onClick={() => {
                  ItemDelete(`${data.itemID}`);
                }}
              >
                <RiDeleteBin5Line className="text-xl text-black bg-white rounded hover:bg-gray-400 " />
              </button>
            </div>

            {/* <DeleteOutlinedIcon/>  */}
          </div>
        </div>
      </div>
      {/* bottom div */}
    </div>
  );
}
