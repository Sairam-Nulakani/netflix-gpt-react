import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Main from "./Main";
import MoviesContainer from "./MoviesContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GPTSearch from "./GPTSearch";

const Browse = () => {
  const [showGptScreen, setShowGptScreen] = useState(false);
  const name = useSelector((store) => store.user);
  console.log(name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const name = localStorage.getItem("name");
    dispatch(addUser(name));
    if (!authToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleGptSearchClick = () => {
    setShowGptScreen(!showGptScreen);
  };
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
          className="cursor-pointer absolute z-10 bg-blue-400 px-4 py-2 rounded-lg right-36 top-6"
          onClick={handleGptSearchClick}
        >
          GPT Search
        </button>
        <button
          className="cursor-pointer absolute z-10 bg-blue-400 px-4 py-2 rounded-lg right-10 top-6"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div>
        {showGptScreen ? (
          <GPTSearch />
        ) : (
          <>
            <Main />
            <MoviesContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
