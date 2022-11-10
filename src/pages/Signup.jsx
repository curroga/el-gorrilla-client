import { useState } from "react";
import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom"

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    // recopilar la informacion del usuario
    const newUser = {
      username,
      email,
      password
    }
    
    try {
      // contactamos con el backend para crear el usuario (servicio)
      await signupService(newUser)
      
      navigate("/login")
      
    } catch (error) {      
      if(error.response && error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
      } else{// si el error es otro (500)

        navigate("/error")
      }
    }
  };

  return (
    <div>

      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>

      <label>User:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Signup</button>

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>

    </div>
  );
}

export default Signup;