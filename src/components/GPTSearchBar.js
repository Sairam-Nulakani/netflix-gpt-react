import React from "react";

const GPTSearchBar = () => {
  return (
    <div className="pt-[11%] w-screen flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you want to watch today?"
        />
        <button className="px-4 py-2 bg-red-800 rounded-lg col-span-3 m-4">
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
