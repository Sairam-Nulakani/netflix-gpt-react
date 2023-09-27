import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  console.log(user);

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

  return (
    <div className="flex justify-between">
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
      {/* <h1>{user.name}</h1> */}
    </div>
  );
};

export default Browse;
