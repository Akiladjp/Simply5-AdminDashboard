import React, { useEffect, useState } from "react";
import preview_image from "../../assets/preview_Image.png";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { RxCross1 } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const OfferComp = (props) => {
  const navigate = useNavigate();

  const [imageUpload, setImageUpload] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [bannerShow, setbannerShow] = useState([]);
  const [show, setshow] = useState(false);
  const [showEye, setShowEye] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageUpload(files);

    // Generate image preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    imageUpload.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const res = await axios.post("http://localhost:8081/addoffer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.message === "Success") {
        toastr.success("Image uploaded successfully.");
        navigate("/app/offers");
      } else if (res.data.message === "error in uploading to database") {
        alert("Error in uploading to database.");
      } else {
        navigate("/app/offers");
      }

      console.log(res);

      if (res.data.message === "Success") {
        setImagePreview([]);
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      alert("An error occurred during form submission. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/showoffer");
        if (res.data.offerBanner) {
          setbannerShow(res.data.offerBanner);
          console.log(res.data.offerBanner);
        } else {
          setbannerShow([]);
          console.log("no data");
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
        setbannerShow([]);
      }
    };

    fetchData();
  }, []);

  const handleRemoveImage = () => {
    setImageUpload([]);
    setImagePreview([]);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const removePopup = () => {
    setshow(false);
  };

  const showPopup = () => {
    setshow(true);
  };

  const handleEye = (id) => {
    setShowEye((prev) => {
      // Check if the current offer is "enable", and toggle the status
      const newStatus = prev[id] === "enable" ? "disable" : "enable";

      // Update the status in the backend
      axios
        .put(`http://localhost:8081/update-status/${id}`, { status: newStatus })
        .then((response) => {
          console.log("Status updated successfully", response.data);
        })
        .catch((error) => {
          console.error("Error updating status", error);
        });

      // Update the state locally to toggle the visibility
      return {
        ...prev,
        [id]: newStatus, // Update the status for this specific id
      };
    });
  };

  const handleDeleteOffer = () => {};

  return (
    <div className="pb-4">
      <div
        className={`${
          show === false
            ? "flex justify-center mt-4"
            : " flex justify-center mt-4 overflow-hidden"
        }`}
      >
        <div
          className="fixed right-8 top-24 bg-blue-500 w-10 h-10 rounded-md text-white flex justify-center items-center shadow-md hover:scale-105 hover:bg-blue-600 active:scale-100"
          onClick={showPopup}
        >
          {""}+{""}
        </div>
        <div className="w-[1200px]">
          {bannerShow.length > 0 ? (
            <div className="flex flex-col gap-6">
              {bannerShow.map((data, index) => (
                <div
                  key={index}
                  className="relative w-full h-[400px] overflow-hidden flex gap-2"
                >
                  <img
                    src={data.image_url}
                    alt={`banner-${data.offerID}`}
                    className="w-full h-full object-cover bg-center rounded-md hover:shadow-xl hover:"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="" onClick={() => handleEye(data.offerID)}>
                      {showEye[data.offerID] === "enable" ? (
                        <FaRegEye className="text-blue-500" size={24} />
                      ) : (
                        <FaRegEyeSlash className="text-red-500" size={24} />
                      )}
                    </div>
                    <div className="" onClick={handleDeleteOffer}>
                      <MdDeleteOutline className="text-red-500" size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No offer banners to display</p>
          )}
        </div>
      </div>

      <div
        className={`${
          show === true
            ? "flex flex-col fixed top-0 justify-center w-[100%] h-screen bg-slate-400 bg-opacity-50 backdrop-blur-md"
            : "hidden"
        }`}
      >
        <div className="flex flex-col w-full max-w-4xl h-[550px] mx-auto bg-white rounded-lg shadow-lg p-8">
          {imagePreview.length !== 0 && (
            <div className="bg-red-600 text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer relative top-[135px] right-2 hover:scale-110 transition-transform">
              <MdDelete onClick={handleRemoveImage} />
            </div>
          )}

          <div className="absolute left-[1390px] top-[175px]  bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-md hover:bg-red-700">
            <RxCross1 onClick={removePopup} />
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Upload Offer Banner
          </h2>

          <div className="w-full">
            <button
              onClick={triggerFileInput}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 transition-colors"
            >
              Select Image
            </button>
            <input
              type="file"
              multiple
              id="fileInput"
              onChange={handleImageChange}
              hidden
            />
          </div>

          <div className="flex flex-col gap-6 mt-6">
            {imagePreview.length === 0 ? (
              <img
                src={preview_image}
                alt="single preview"
                className="w-[600px] h-[200px] object-cover rounded-lg shadow-md transition-transform duration-500"
              />
            ) : (
              imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`preview-${index}`}
                  className="w-[600px] h-[200px] object-cover rounded-lg shadow-md transition-transform duration-500"
                />
              ))
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg shadow-lg font-semibold text-white text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
