import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'


function Navbar() {

  const { authenticaUser, isLoggedIn } = useContext(AuthContext)

  const handleLogout = () =>{
    localStorage.removeItem("authToken") // borramos el token 
    authenticaUser()// volvemos a invocar para actualizar el componente y ahora si nuestro estado parasara a falso
  }

  const asignClassName = (navInfo) => {
    console.log(navInfo.isActive)
    if(navInfo.isActive === true) {
      return "nav-active"
    } else {
      return "nav-inactive"
    }
  }

  



  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <NavLink to="/" className={asignClassName}>
            <button>Home</button>
            </NavLink>
          <NavLink to="/profile" className={asignClassName}>
            <button>Perfil</button>
            </NavLink>
            <div className='nav-inactive'>
              <button onClick={handleLogout}>Cerrar Sesion</button>
            </div>
        </div>
      ) : (
        <div>
          <NavLink to="/" className={asignClassName}>
            <button>Home</button>
            </NavLink>
          <NavLink to="/signup" className={asignClassName}>
            <button>Registrarse</button>
            </NavLink>
          <NavLink to="/login" className={asignClassName}>
            <button>Acceder</button>
            </NavLink>
        </div>
      )
    }
    </div>
  )
}

export default Navbar