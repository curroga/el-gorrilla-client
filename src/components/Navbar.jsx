import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'


function Navbar() {

  const { authenticaUser, isLoggedIn } = useContext(AuthContext)

  const handleLogout = () =>{
    localStorage.removeItem("authToken") // borramos el token 
    authenticaUser()// volvemos a invocar para actualizar el componente y ahora si nuestro estado parasara a falso
  }
  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <Link to="/">Home</Link>
          <Link to="/profile">Perfil</Link>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/signup">Registrarse</Link>
          <Link to="/login">Acceder</Link>
        </div>
      )
    }
    </div>
  )
}

export default Navbar