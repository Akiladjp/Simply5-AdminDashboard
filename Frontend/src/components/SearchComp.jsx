import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { debounce } from "lodash";

export const SearchComp = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleChange = (event) => {
    const { value } = event.target;
    
    // If the input is not exactly "0", proceed
    if (value !== "0") {
      setSearchInput(value);
      debouncedSearch(value);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <div className="w-full justify-end flex ">
      <div className="w-[280px] py-1 border-2 border-[rgb(0,127,168)] rounded-full mb-8">
        <form>
          <div className="flex ">
            <div className="w-[85%] flex justify-center items-center ">
              <input
                type="text"
                id="search"
                name="search"
                value={searchInput}
                onChange={handleChange}
                placeholder="Search by phone number"
                className="text-sm outline-none px-2"
              />
            </div>
            <div className="flex w-[15%] justify-center items-center">
              <CiSearch />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
