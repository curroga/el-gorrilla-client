import { useState } from "react";
import { loginService } from "../services/auth.service";
import { useNavigate } from "react-router-dom"

import { useContext } from 'react'
import { AuthContext } from "../context/auth.context";

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
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        
      <label>User:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
       
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Login</button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>

    </div>
  );
}

export default Login;