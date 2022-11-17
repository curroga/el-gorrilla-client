import { useState } from "react";
import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      password,
    };

    try {
      // contactamos con el backend para crear el usuario (servicio)
      await signupService(newUser);

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500)

        navigate("/error");
      }
    }
  };

  return (
    <div className="form-container-body">
      <div className="form-container">
        <div className="login-container">
          <h1>Registrate Aqui</h1>

          <form onSubmit={handleSignup}>
            <label>User:</label>
            <p>
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            </p>
            <p>

            <label>Email:</label>
            <input
              className="input"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
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

            <button className="btn login-provider" type="submit">Registrarse</button>

            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
