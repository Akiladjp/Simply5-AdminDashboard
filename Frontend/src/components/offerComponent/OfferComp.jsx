import React, { useState } from "react";
import offer_banner from "./food-offer-1.png";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";


export const OfferComp = (props) => {
  const navigate = useNavigate();

  const [imageUpload, setImageUpload] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

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
      formData.append("image", file); // Send the actual image files
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
    } catch (err) {
      console.error("Error during form submission:", err);
      alert("An error occurred during form submission. Please try again.");
    }
  };

  const handleRemoveImage = () => {
    setImageUpload([]);
    setImagePreview([]);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="pb-4">
      <div className="flex justify-center mt-4">
        <div className="w-[1200px] h-[400px]">
          <img src={offer_banner} alt="Offer banner" />
        </div>
      </div>
      <div className="flex flex-col items-center mt-16 py-10 relative">
        <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 relative">
          {imagePreview.length !== 0 && (
            <div
              className={`bg-red-600 text-white rounded-full w-6 h-6 absolute top-36 left-6 flex justify-center items-center cursor-pointer hover:scale-110 hover:transition-transform`}
            >
              <MdDelete onClick={handleRemoveImage} className="hover:scale-110" />
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Upload Offer Banner
          </h2>

          <div className="w-full">
            <button
              onClick={triggerFileInput}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700"
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

          <div className="flex gap-6 mt-6">
            {imagePreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`preview-${index}`}
                className="w-1/3 object-cover rounded-lg shadow-md"
              />
            ))}
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
