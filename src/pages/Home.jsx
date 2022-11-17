import React from "react";

import Login from "./Login"

import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <h1>El Gorrilla</h1>
      </div>

      <div>
        <div>
          <Login />
        </div>

        <NavLink to="/signup" >
          <button>Registrarse</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
