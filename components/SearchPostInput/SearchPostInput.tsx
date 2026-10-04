"use client";
import { useState } from "react";

const SearchPostInput = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <form className="my-4 mx-auto w-full md:w-2/3">
      <input
        type="search"
        id="search"
        placeholder="Enter Search text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </form>
  );
};

export default SearchPostInput;
