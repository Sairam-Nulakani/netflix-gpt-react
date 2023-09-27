import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies, addTrendingMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const getTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=9",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };
  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
