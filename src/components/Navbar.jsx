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
    //console.log(navInfo.isActive)
    if(navInfo.isActive === true) {
      return "nav-active"
    } else {
      return "nav-inactive"
    }
  }

  return (
    <div>
      {isLoggedIn === true ? (
        <div className='nav'>
          
          <NavLink to="/profile" className={asignClassName}>
            <button>Perfil</button>
            </NavLink>

          <NavLink to="/calles" className={asignClassName}>
            <button>Calles</button>
            </NavLink>
            
            <NavLink className='nav-inactive'>
              <button onClick={handleLogout}>Cerrar Sesion</button>
            </NavLink>

        </div>
      ) : (
        <div>

          <NavLink to="/" className={asignClassName}>
            <button>Home</button>
          </NavLink> 

        </div>
      )
    }
    </div>
  )
}

export default Navbar