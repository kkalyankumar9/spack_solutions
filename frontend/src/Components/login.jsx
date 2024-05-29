import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logIn } from "../Redux/Auth/action";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navBar";

const Login = () => {
  const initialData = {
    email: "",
    password: "",
  };

  const [signData, setSignData] = useState(initialData);
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setInputErrors((prev) => ({
        ...prev,
        email: isValidEmail ? "" : "Enter a valid email address",
      }));
    } else if (name === "password") {
      const isValidPassword = validatePassword(value);
      setInputErrors((prev) => ({
        ...prev,
        password: isValidPassword
          ? ""
          : "Password must contain at least 8 characters, including upper/lowercase, number, and special character",
      }));
    }
  };

  const validatePassword = (password) => {
    const pattern =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;
    return pattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signData.email || !signData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const user = {
      email: signData.email,
      password: signData.password,
    };

    try {
      const response = await dispatch(logIn(user));

      if (response && response.token) {
        navigate("/");
        toast.success("Login Successful");
      } else {
        toast.error(
          response.msg || "An error occurred during login. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.message || "An error occurred during login. Please try again."
      );
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={signData.email}
                    onChange={handleChange}
                    className={`appearance-none rounded-md relative block w-full px-4 py-3 border ${
                      inputErrors.email ? "border-red-500" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-lg`}
                    required
                  />
                  {inputErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {inputErrors.email}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={signData.password}
                    onChange={handleChange}
                    className={`appearance-none rounded-md relative block w-full px-4 py-3 border ${
                      inputErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-lg`}
                    required
                  />
                  {inputErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {inputErrors.password}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-md text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-pink-600 hover:text-pink-500"
              >
                Register
              </Link>
            </p>
            <button
              onClick={handleBack}
              className="mt-4 block w-full text-center text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
