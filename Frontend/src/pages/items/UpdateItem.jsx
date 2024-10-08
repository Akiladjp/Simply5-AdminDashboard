import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidCategoryAlt, BiSolidCloudUpload } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import { IoIosPricetags } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateItem() {
  const navigate = useNavigate();
  const { itemID } = useParams();
  const [loading, setLoading] = useState(false);
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
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/updateItem/${itemID}`
        );

        if (response.data.preeItem) {
          setData({
            name: response.data.preeItem[0].name || "",
            category: response.data.preeItem[0].category || "",
            sub_category: response.data.preeItem[0].sub_category || "",
            price: response.data.preeItem[0].price || "",
            prepare_time: response.data.preeItem[0].prepare_time || "",
            description: response.data.preeItem[0].description || "",
            Pre_imageUrl: response.data.preeItem[0].image_url || "",
          });
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [itemID]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setImage(URL.createObjectURL(file)); // Preview the image
      setFileName(file.name);
      setData((prevData) => ({ ...prevData, new_image: file }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (
      !data.name ||
      !data.category ||
      !data.price ||
      !data.prepare_time ||
      !data.description ||
      !data.new_image
    ) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
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
        if (data.category === "Meal") {
          navigate("/app/items/meals");
        } else if (data.category === "Drinks") {
          navigate("/app/items/drinks");
        } else {
          navigate("/app/items/desserts");
        }
      } else {
        alert(`Error: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred while updating the item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (data.category === "Meal") {
      navigate("/app/items/meals");
    } else if (data.category === "Drinks") {
      navigate("/app/items/drinks");
    } else {
      navigate("/app/items/desserts");
    }
  };

  return (
    <div className="flex justify-center w-full p-1 mt-1 rounded-xl">
      <form
        className="w-3/4 lg:w-[35%] md:w-3/5 xl:w-[35%]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <div
            className="flex justify-center items-center rounded-lg h-80 border-0 cursor-pointer w-full mb-8"
            onClick={() => document.querySelector(".input-field").click()}
          >
            <div className="text-center object-cover w-full overflow-hidden h-full flex items-center justify-center ">
              {image ? (
                <div className="mb-5 flex flex-col items-center justify-center text-center">
                  <img src={image} alt="" />
                </div>
              ) : (
                <img
                  src={data.Pre_imageUrl}
                  alt={fileName}
                  className="mb-4 rounded-md shadow-lg flex items-center justify-center text-center"
                />
              )}
              <input
                required
                type="file"
                accept="image/*"
                onChange={handleChange}
                hidden
                className="input-field file:py-2 file:px-4 file:border-0 file:rounded-xl file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
            <label className="p-2 text-[#027297]">
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

        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297]">
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

        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297]">
            <IoIosPricetags size="1.0rem" />
          </label>
          <input
            onChange={handleChange}
            type="number"
            placeholder="  Price"
            value={data.price}
            name="price"
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>

        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297]">
            <IoTime size="1.0rem" />
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="  Delivery time"
            value={data.prepare_time}
            name="prepare_time"
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>

        <div className="flex justify-center w-full py-1 mb-5 bg-white rounded-md border-0 text-black shadow-sm shadow-[rgb(81,191,228)] ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 px-3 ">
          <label className="p-2 text-[#027297]">
            <MdDescription size="1.0rem" />
          </label>
          <textarea
            onChange={handleChange}
            placeholder="  Description"
            value={data.description}
            name="description"
            className="w-full py-1 ml-1 bg-white rounded-md outline-none focus:ring-2 focus:ring-inset focus:ring-transparent placeholder:text-black"
          />
        </div>

        <div className="flex justify-center w-full py-2">
          <button
            onClick={handleCancel}
            type="button"
            className="flex w-1/3 justify-center rounded-none bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 mx-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex w-1/3 justify-center rounded-none ${
              loading ? "bg-gray-300" : "bg-[rgb(0,127,168)]"
            }  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(81,191,228)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(81,191,228)]`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
