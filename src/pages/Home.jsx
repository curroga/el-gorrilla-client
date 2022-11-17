import React from "react";
import "../styles/Home.css";

import Login from "../components/Login";

import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="form-container-body">
      <div className="form-container">
        <Login />
        <div className="welcome-screen-container"></div>
      </div>
    </div>
  );
}

export default Home;
