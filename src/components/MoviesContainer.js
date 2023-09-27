import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-52 relative z-20 pl-8">
          <MovieList
            title={"Now Playing"}
            movies={movies.addNowPlayingMovies}
          />
          <MovieList title={"UpComing Movies"} movies={movies.upcomingMovies} />
          <MovieList title={"Trending Movies"} movies={movies.trendingMovies} />
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList title={"TopRated Movies"} movies={movies.topratedMovies} />
        </div>
      </div>
    )
  );
};

export default MoviesContainer;
