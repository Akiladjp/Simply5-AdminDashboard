import axios from "axios";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

export const SearchComp = () => {
  const [usesearch, setUseSearch] = useState({
    search: "",
  });

  const handleChange = (event) => {
    setUseSearch({
      ...usesearch,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Search for phone number:", usesearch.search);
  };

  return (
    <div className="w-full justify-end flex">
      <div className="w-[280px] py-1 border-2 border-[rgb(0,127,168)] rounded-full mb-8">
        <form action="">
          <div className="flex">
            <div className="w-[80%] flex justify-center items-center">
              <input
                type="text"
                id="search"
                name="search"
                value={usesearch.search}
                onChange={handleChange}
                placeholder="Search phone number"
                className="text-sm outline-none"
              />
            </div>
            <div className="flex w-[20%] justify-center">
              <button
                className="flex justify-center items-center"
                onClick={handleClick}
              >
                <CiSearch />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
