import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGIN_BG } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: isSignInForm
      ? undefined
      : Yup.string()
          .required("Name is Required")
          .max(35, "Name length is Exceeded 35 Characters"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "Password must contain at least 8 characters, including one letter and one number"
    // ),
    mobilenumber: isSignInForm
      ? undefined
      : Yup.string().required("Mobile Number is required").min(10),
  });
  const notify = (data) => toast(data);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobilenumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isSignInForm) {
          const signInResponse = await axios.post(
            "http://localhost:8090/api/users/login",
            values
          );
          notify("Sign in Successfull");
          localStorage.setItem("authToken", signInResponse.data.token);
          localStorage.setItem("name", signInResponse.data.user.name);
          dispatch(addUser(signInResponse.data.user));
          navigate("/browse");
        } else {
          const registerResponse = await axios.post(
            "http://localhost:8090/api/users/register",
            values
          );
          console.log(registerResponse.data);
          dispatch(addUser(registerResponse.data));
          notify("Regestration Successfull");
        }
      } catch (err) {
        console.error("API Error:", err);
        notify(err.response.data);
      }
    },
  });

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/browse");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGIN_BG} alt="logo" />
      </div>
      <form
        className="absolute w-4/12 my-28 mx-auto left-0 right-0 text-white flex flex-col justify-center bg-black p-12 rounded-lg bg-opacity-80"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700 rounded-sm"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-700">{formik.errors.name}</p>
            )}
            <input
              type="text"
              placeholder="Mobile Number"
              className="p-4 my-4 w-full bg-gray-700 rounded-sm"
              name="mobilenumber"
              value={formik.values.mobilenumber}
              onChange={formik.handleChange}
            />
            {formik.touched.mobilenumber && formik.errors.mobilenumber && (
              <p className="text-red-700">{formik.errors.mobilenumber}</p>
            )}
          </div>
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-700">{formik.errors.email}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700 rounded-sm pr-12"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              className="absolute text-2xl text-gray-400 right-4 top-8 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <AiOutlineEye
              className="absolute text-2xl text-gray-400 right-4 top-8 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-700">{formik.errors.password}</p>
        )}
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg" type="submit">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer text-sm text-gray-300 hover:text-gray-400"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "Are you new to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
