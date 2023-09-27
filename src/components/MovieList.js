import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold px-4 py-3 text-white">{title}</h1>
      <div className="flex space-x-4 overflow-x-scroll px-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
