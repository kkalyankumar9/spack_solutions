import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navBar";

import DisplayMovies from "./displayMovies";
import { useSelector } from "react-redux";

const Homepage = () => {
  return (
    <div className="text-center text-4xl p-4">
      <Navbar />
      <DisplayMovies />
    </div>
  );
};

export default Homepage;
