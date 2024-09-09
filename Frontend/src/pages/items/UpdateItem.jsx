import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import { IoIosPricetags } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateItem() {
  const navigate = useNavigate();
  const { itemID } = useParams();
console.log(itemID);
  const [data, setData] = useState({
    name: "",
    category: "",
    sub_category: "",
    price: "",
    prepare_time: "",
    description: "",
    new_image: "",
    Pre_imageUrl: "",
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/updateItem/${itemID}`
        );

        // Check if the data is valid before setting the state
        if (response.data.preeItem) {
          setData({
            name: response.data.preeItem[0].name || "",
            category: response.data.preeItem[0].category || "",
            sub_category: response.data.preeItem[0].sub_category || "",
            price: response.data.preeItem[0].price || "",
            prepare_time: response.data.preeItem[0].prepare_time || "",
            description: response.data.preeItem[0].description || "",

            Pre_imageUrl: response.data.preeItem[0].image_url || "",
           // imageUrl: response.data.preeItem[0].image_url || "",
          });
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    //console.log(data);

    // Ensure empID is defined before making the request
    fetchEmployeeData();
  }, [itemID]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      setData((prevData) => ({ ...prevData, new_image: files[0] }));
      console.log("new image",files[0]);
      console.log("imageURl",data.Pre_imageUrl);
     
    }else{
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
   
  };
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);

     // console.log(formData);
    });
    try {
      const res = await axios.put(
        `http://localhost:8081/updateItem/${itemID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (res.data.message === "success") {
        alert("Update Successful");
        if (data.category == "Meal") {
          navigate("/app/items/meals");
        } else if (data.category == "Drinks") {
          navigate("/app/items/drinks");
        } else {
          navigate("/app/items/desserts");
        }
      } else {
        alert(`Error: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred while updating the employee. Please try again.");
    }
  };
  const handleCnacel = () => {
    if (data.category == "Meal") {
      navigate("/app/items/meals");
    } else if (data.category == "Drinks") {
      navigate("/app/items/drinks");
    } else {
      navigate("/app/items/desserts");
    }
  };
  return (
    <div className="flex justify-center w-full p-1 mt-1 rounded-xl">
      <form
        className="w-3/4 lg:w-[35%] md:w-3/5 xl:w-[35%]"
        action=""
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* ======================= */}

        {/* <input type="text" name='category' value={category} hidden onChange={handleChange}/> */}

        {/* ======================== */}

        <div>
          <div className="flex justify-center w-full mb-5">
            {/* <label className="flex flex-col items-center justify-center order-2 lg:w-32 lg:h-32 md:w-28 md:h-28  sm:w-20 sm:h-20  xl:h-32 xl:w-32 w-20 h-20 p-2 md:mt-8 md:mb-8 lg:mt-10 lg:mb-10 mt-6 mb-6  bg-white shadow-md rounded-full cursor-pointe shadow-[rgb(81,191,228)]">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
          <svg className="w-3 h-3 lg:w-5 lg:h-5 md:w-4 md:h-4 mx-auto text-[rgb(81,191,228)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" />
              </svg>
          </div>
          </label> */}
          </div>

          {/* ============================== */}
          <div className="flex object-cover w-40 h-40 my-16 bg-red-100 item-center justifey-center">
            <img src={data.Pre_imageUrl} alt={`${data.name} profile`} />
          </div>
          {/* =============================== */}
          <div>
            {/* <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mb-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-100"
            required
          /> */}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="mb-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-100"
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)]  ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 px-3 ">
            <label className="p-2 text-[#027297] " htmlFor="">
              <GiMeal size="1.0rem" />
            </label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="  Food Name"
              value={data.name}
              name="name"
              className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
            />
          </div>
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)]  ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297] " htmlFor="">
            <BiSolidCategoryAlt size="1.0rem" />
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="  Sub category"
            value={data.sub_category}
            name="sub_category"
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)]  ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297] " htmlFor="">
            <IoIosPricetags size="1.0rem" />
          </label>
          <input
            onChange={handleChange}
            type="decimal"
            placeholder="  Price"
            value={data.price}
            name="price"
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)]  ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297]" htmlFor="">
            <IoTime size="1.0rem" />
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="  Delivery time"
            name="prepare_time"
            value={data.prepare_time}
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>
        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)]  ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297] " htmlFor="">
            <MdDescription size="1.0rem" />
          </label>
          <textarea
            onChange={handleChange}
            cols="30"
            rows="2"
            value={data.description}
            placeholder="  Description"
            name="description"
            className="w-full py-1 ml-1 bg-white rounded-md outline-none resize-none placeholder:text-black"
          />
        </div>

        <div className="flex justify-center gap-8 p-5 lg:gap-16 md:gap-12 lg:mt-8">
          <button
            onClick={handleCnacel}
            className="flex w-1/3 justify-center rounded-none bg-white  border-[rgb(0,127,168)] border-[2px] px-1 py-1.5 text-sm font-semibold leading-6 text-[rgb(0,127,168)] shadow-sm "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex w-1/3 justify-center rounded-none bg-[rgb(0,127,168)]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(81,191,228)]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(81,191,228)]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
