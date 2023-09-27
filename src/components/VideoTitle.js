import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-12 text-white absolute bg-gradient-to-r from-black pb-5">
      <h1 className="font-bold text-6xl">{title}</h1>
      <p className="my-6 text-md w-1/4">{overview}</p>
      <div className="gap-4 flex">
        <button className="px-10 py-2 bg-white rounded-lg text-black font-semibold flex items-center justify-center gap-2 text-xl bg-opacity-90 hover:bg-opacity-70">
          <FaPlay />
          Play
        </button>
        <button className="px-10 py-2 bg-orange-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 text-xl bg-opacity-90 hover:bg-opacity-70">
          <IoMdInformationCircleOutline className="text-3xl" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
