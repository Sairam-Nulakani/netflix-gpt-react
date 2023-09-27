import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="font-bold text-6xl">{title}</h1>
      <p className="my-6 text-lg w-1/4">{overview}</p>
      <div className="gap-4 flex">
        <button className="px-10 py-2 bg-gray-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 text-xl bg-opacity-50">
          <FaPlay />
          Play
        </button>
        <button className="px-10 py-2 bg-orange-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 text-xl bg-opacity-50">
          <IoMdInformationCircleOutline className="text-3xl" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
