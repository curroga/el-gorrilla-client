import ListaFavoirtos from "../components/calles/ListaFavoirtos"
import CarList from "../components/cars/CarList"
import "../styles/profile.css"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../context/auth.context'
import { getCallesFavoritas } from '../services/calles.service'
import { getAllCarsService } from '../services/cars.service'

function Profile() {
  const { user, isAdminIn } = useContext(AuthContext)
  const [stats, setStats] = useState({ favoritos: 0, coches: 0 })
  const [activeTab, setActiveTab] = useState('favoritos')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [favResponse, carsResponse] = await Promise.all([
          getCallesFavoritas(),
          getAllCarsService()
        ])
        setStats({
          favoritos: favResponse.data?.length || 0,
          coches: carsResponse.data?.length || 0
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchStats()

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 20) return "Buenas tardes"
    return "Buenas noches"
  }

  const formatDate = () => {
    return currentTime.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="profile-page">
      {/* Decorative background elements */}
      <div className="profile-bg-pattern"></div>
      <div className="profile-bg-gradient"></div>

      <div className="profile-wrapper">
        {/* Hero Section */}
        <header className="profile-hero">
          <div className="hero-content">
            <div className="hero-left">
              <div className="avatar-wrapper">
                <div className="avatar-ring"></div>
                <div className="avatar-main">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                {isAdminIn && (
                  <div className="avatar-badge" title="Administrador">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                )}
              </div>

              <div className="hero-info">
                <p className="greeting-text">{getGreeting()}</p>
                <h1 className="user-name">{user?.username}</h1>
                <div className="user-meta">
                  <span className="role-tag">
                    {isAdminIn ? '◆ Administrador' : '○ Usuario'}
                  </span>
                  <span className="meta-divider">•</span>
                  <span className="date-text">{formatDate()}</span>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="quick-stats">
                <div className="quick-stat" onClick={() => setActiveTab('favoritos')}>
                  <div className="stat-number">{stats.favoritos}</div>
                  <div className="stat-name">Favoritos</div>
                </div>
                <div className="stat-separator"></div>
                <div className="quick-stat" onClick={() => setActiveTab('vehiculos')}>
                  <div className="stat-number">{stats.coches}</div>
                  <div className="stat-name">Vehículos</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="profile-nav">
          <button
            className={`nav-tab ${activeTab === 'favoritos' ? 'active' : ''}`}
            onClick={() => setActiveTab('favoritos')}
          >
            <span className="tab-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <span className="tab-text">Calles Favoritas</span>
            <span className="tab-count">{stats.favoritos}</span>
          </button>

          <button
            className={`nav-tab ${activeTab === 'vehiculos' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehiculos')}
          >
            <span className="tab-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 17h14v-5H5v5zm2-3h2v2H7v-2zm8 0h2v2h-2v-2z"/>
                <path d="M19 9l-2-4H7L5 9"/>
                <circle cx="7" cy="17" r="2"/>
                <circle cx="17" cy="17" r="2"/>
              </svg>
            </span>
            <span className="tab-text">Mis Vehículos</span>
            <span className="tab-count">{stats.coches}</span>
          </button>
        </nav>

        {/* Content Sections */}
        <main className="profile-main">
          <section className={`content-panel ${activeTab === 'favoritos' ? 'visible' : ''}`}>
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Calles Favoritas</h2>
                <p className="panel-subtitle">Tus zonas de aparcamiento guardadas en Sevilla</p>
              </div>
            </div>
            <div className="panel-content">
              <ListaFavoirtos />
            </div>
          </section>

          <section className={`content-panel ${activeTab === 'vehiculos' ? 'visible' : ''}`}>
            <div className="panel-content panel-content--full">
              <CarList />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="profile-footer">
          <div className="footer-content">
            <span className="footer-brand">El Gorrilla</span>
            <span className="footer-tagline">Aparcamiento fácil en Sevilla</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Profile
