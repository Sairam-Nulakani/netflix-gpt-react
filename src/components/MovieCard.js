import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return <img alt="" className="w-48" src={IMG_CDN + posterPath} />;
};

export default MovieCard;
