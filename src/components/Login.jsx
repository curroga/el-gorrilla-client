import { useState } from "react";
import { loginService } from "../services/auth.service";
import { useNavigate } from "react-router-dom"

import { useContext } from 'react'
import { AuthContext } from "../context/auth.context";

import { NavLink } from "react-router-dom";

import "../styles/Home.css"


function Login() {

  const { authenticaUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);  
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here

    // 1. recopilar las credenciales del usuario
    const userCredentials = {
      username,
      password
    }

    try {
      // 2. contactar con el backend para validarlo
      const response = await loginService(userCredentials)  
      // 3. recibir el Token
      //console.log(response.data.authToken)
  
      // 4. hacer algo con el Token?
      
      localStorage.setItem("authToken", response.data.authToken) // localStorage para guardar info 

      authenticaUser()// invocar la funcion de context que valida el Token

      //redireccionar al usuario
      navigate("/profile")

      
    } catch (error) {      
      if(error.response && (error.response.status === 400 || error.response.status === 401)){
        setErrorMessage(error.response.data.errorMessage)
      } else{// si el error es otro (500)

        navigate("/error")
      }
      
    }

  };

  return (
    <div className="login-container">

      <h1> Bienvenido a Gorrilla App</h1>
      
      <form onSubmit={handleLogin}>
        <p>
      <label>User:</label>
        <input
          className="input"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        </p>
        <p>
        <label>Password:</label>
        <input
          className="input"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        </p>

        <p>
        <button className="btn login-provider" type="submit">Login</button>
        </p>
        <NavLink style={{textDecoration: "none"}} to="/signup" ><button className="btn facebook-provider">Registrarse</button></NavLink>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>

    </div>
  );
}

export default Login;