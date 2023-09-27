import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Main from "./Main";
import MoviesContainer from "./MoviesContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
  }, [navigate]);
  useNowPlayingMovies();
  usePopularMovies();
  useUpComingMovies();
  useTrendingMovies();
  useTopRatedMovies();
  return (
    <div className="flex">
      <div>
        <Header />
      </div>
      <div>
        <button
          className="cursor-pointer absolute z-10 bg-blue-400 px-4 py-2 rounded-lg right-10 top-6"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div>
        <Main />
        <MoviesContainer />
      </div>
    </div>
  );
};

export default Browse;
