import React, { useEffect, useState, useContext } from 'react'
import AddCalles from '../../components/calles/AddCalles'
import { Link } from 'react-router-dom'
import { getAllCallesService } from '../../services/calles.service'
import { ClimbingBoxLoader } from "react-spinners"
import { AuthContext } from "../../context/auth.context"
import Search from '../../components/calles/Search'
import MapView from '../../components/maps/MapView'
import '../../styles/calles.css'

function CallesList() {

  const { isAdminIn } = useContext(AuthContext)

  //1. creamos el estado que almacena la data de la API
  const [list, setList] = useState([])
  const [filterList, setFilterList] = useState([])
  const [ isFetching, setIsFetching] = useState(true)
  const [mostrarAddCalles, setMostrarAddCalles] = useState(false)
  const [mostrarMapa, setMostrarMapa] = useState(false)

  //2. llamar a la api
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      const response = await getAllCallesService()
      console.log(response)
      
      // 3. guardar la info en el estado
      setList(response.data)
      setFilterList(response.data)
      setIsFetching(false)
      
    } catch (error) {
      console.log(error)
    }
  }


  // 4. clausula de guardia
  if (isFetching === true){ 
    return(
       <div className="App"> 
        <div className="spinner">
          <ClimbingBoxLoader size={25} color={"#36d7b7"} />
        </div>
      </div>
    )
  }
  const filterCalles = (filterQuery) => {
    const filteredCalles = list.filter((eachCalle) => {
      return eachCalle.name.startsWith(filterQuery)
    })
    setFilterList(filteredCalles)
  }

  const handleClick = () => setMostrarAddCalles(!mostrarAddCalles)
  const handleClickMapa = () => setMostrarMapa(!mostrarMapa)


  //5. renderizar la data
  return (
    <div className='calles-container'>
      <div className='calles-header'>
        <div className='header-content'>
          <div className='title-section'>
            <h1 className='page-title'>🛣️ Gestión de Calles</h1>
            <p className='page-subtitle'>Administra y visualiza todas las calles disponibles</p>
          </div>
          
          <div className='header-actions'>
            {isAdminIn === true && (
              <button className='add-street-btn' onClick={handleClick}>
                <span className='btn-icon'>➕</span>
                Añadir Calle
              </button>
            )}
            
            <button 
              className={`map-toggle-btn ${mostrarMapa ? 'active' : ''}`}
              onClick={handleClickMapa}
            >
              <span className='btn-icon'>🗺️</span>
              {mostrarMapa ? 'Ocultar Mapa' : 'Ver Mapa'}
            </button>
          </div>
        </div>
      </div>

      {mostrarAddCalles && (
        <div className='add-calles-modal'>
          <div className='modal-content'>
            <button className='close-modal' onClick={() => setMostrarAddCalles(false)}>
              ✕
            </button>
            <AddCalles actualizarLista={getData} detalles={filterList} />
          </div>
        </div>
      )}

      <div className='calles-content'>
        <div className='sidebar'>
          <div className='search-section'>
            <Search filterCalles={filterCalles} />
          </div>
          
          <div className='calles-list-container'>
            <div className='list-header'>
              <h3>📍 Lista de Calles</h3>
              <span className='count-badge'>{filterList.length} calles</span>
            </div>
            
            <div className='calles-grid'>
              {filterList.map((eachCalle) => {
                const plazasLibres = (eachCalle.numAparcamientos || 0) - 
                  (eachCalle.coches?.length || 0) - 
                  (eachCalle.numOcupados || 0) + 
                  (eachCalle.numLibres || 0);
                
                return (
                  <Link key={eachCalle._id} to={`/calles/${eachCalle._id}/details`} className='calle-card'>
                    <div className='card-header'>
                      <h4 className='calle-name'>{eachCalle.name}</h4>
                      <div className='availability-indicator'>
                        <div className={`status-dot ${plazasLibres > 0 ? 'available' : 'full'}`}></div>
                        <span className='status-text'>
                          {plazasLibres > 0 ? 'Disponible' : 'Completo'}
                        </span>
                      </div>
                    </div>
                    
                    <div className='card-stats'>
                      <div className='stat'>
                        <span className='stat-icon'>🚗</span>
                        <span className='stat-value'>{eachCalle.numAparcamientos || 0}</span>
                        <span className='stat-label'>Total plazas</span>
                      </div>
                      
                      <div className='stat'>
                        <span className='stat-icon'>✅</span>
                        <span className='stat-value'>{plazasLibres}</span>
                        <span className='stat-label'>Libres</span>
                      </div>
                      
                      <div className='stat'>
                        <span className='stat-icon'>🚙</span>
                        <span className='stat-value'>{eachCalle.coches?.length || 0}</span>
                        <span className='stat-label'>Ocupadas</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className='main-content'>
          {mostrarMapa && (
            <div className='map-container'>
              <div className='map-header'>
                <h3>🗺️ Mapa Interactivo</h3>
                <p>Haz clic en los marcadores para ver información de cada calle</p>
              </div>
              <div className='map-wrapper'>
                <MapView detalles={filterList} />
              </div>
            </div>
          )}
          
          {!mostrarMapa && (
            <div className='empty-state'>
              <div className='empty-icon'>🗺️</div>
              <h3>Vista de Mapa</h3>
              <p>Activa la vista de mapa para ver la ubicación de todas las calles</p>
              <button className='activate-map-btn' onClick={handleClickMapa}>
                Ver Mapa Interactivo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CallesList