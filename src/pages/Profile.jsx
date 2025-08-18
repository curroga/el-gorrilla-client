import ListaFavoirtos from "../components/calles/ListaFavoirtos"
import CarList from "../components/cars/CarList"
import "../styles/profile.css"

import { useContext } from "react"
import { AuthContext } from '../context/auth.context'


function Profile() {  

  const { user } = useContext(AuthContext)

  console.log(user)
  

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-title">Bienvenido, {user?.username}</h1>
          <p className="profile-subtitle">Tu panel de control personal</p>
          <div className="user-badges">
            <span className="badge-role">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="section-header">
            <h3>🅿️ Calles Favoritas</h3>
          </div>
          <div className="section-content">
            <ListaFavoirtos />
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>🚗 Mis Vehículos</h3>
          </div>
          <div className="section-content">
            <CarList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile