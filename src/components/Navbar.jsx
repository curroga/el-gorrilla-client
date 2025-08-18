import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import '../styles/navbar.css'


function Navbar() {

  const { authenticaUser, isLoggedIn, user } = useContext(AuthContext)

  const handleLogout = () =>{
    localStorage.removeItem("authToken")
    authenticaUser()
  }

  const asignClassName = (navInfo) => {
    if(navInfo.isActive === true) {
      return "nav-link nav-link-active"
    } else {
      return "nav-link"
    }
  }

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🅿️</span>
          <span className="brand-text">El Gorrilla</span>
        </div>

        {isLoggedIn === true ? (
          <>
            <div className="navbar-menu">
              <NavLink to="/profile" className={asignClassName}>
                <span className="nav-icon">👤</span>
                Perfil
              </NavLink>

              <NavLink to="/calles" className={asignClassName}>
                <span className="nav-icon">🛣️</span>
                Calles
              </NavLink>

              <NavLink to="/cars" className={asignClassName}>
                <span className="nav-icon">🚗</span>
                Vehículos
              </NavLink>
            </div>

            <div className="navbar-user">
              <div className="user-info">
                <div className="user-avatar">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user?.username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <span className="logout-icon">🚪</span>
                Salir
              </button>
            </div>
          </>
        ) : (
          <div className="navbar-menu">
            <NavLink to="/" className={asignClassName}>
              <span className="nav-icon">🏠</span>
              Inicio
            </NavLink>
            <NavLink to="/signup" className={asignClassName}>
              <span className="nav-icon">✍️</span>
              Registro
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar