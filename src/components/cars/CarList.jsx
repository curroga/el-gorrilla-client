import React, { useEffect, useState } from 'react'
import AddCars from './AddCars'
import InfoCard from './InfoCard'
import { updateCarsService, deleteCarsService, getAllCarsService } from '../../services/cars.service'
import { useNavigate } from 'react-router-dom'
import { ClimbingBoxLoader } from "react-spinners"
import '../../styles/cars.css'




function CarList() { 

  const navigate = useNavigate()

  //1. creamos el estado que almacena la data de la API
  const [list, setList] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [mostrarAddCars, setMostrarAddCars] = useState(false)

  //2. LLamar a la API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await getAllCarsService()
      console.log(response)
      //3. guardar la info en el estado      
        setList(response.data)
        setIsFetching(false)
      

    } catch (error) {
      console.log(error)
    }
  }


  //4. clausula de guardia
  if (isFetching === true){ 
    return(
       <div className="App"> 
        <div className="spinner">
          <ClimbingBoxLoader size={25} color={"#36d7b7"} />
        </div>
      </div>
    )
  }

  const handleClick = () => setMostrarAddCars(!mostrarAddCars)
  
  const handleDelete = async (id) => {
    try {
      await deleteCarsService(id)
      console.log("elemento borrado")
      const temp = list.filter(item => item._id !== id)
      setList(temp)
      
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
    
  }

  const handleUpdate = async (id, newCar) => {

    try {
      await updateCarsService(id, newCar)
      console.log("elemento actualizado")

      const copy = [...list]
      
      const item = copy.find(item => item._id === id)
      
      item.modelo = newCar.modelo
      item.matricula = newCar.matricula
      item.color = newCar.color  
      
      setList(copy)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  //5. renderizamos
  return (
    <div className='cars-container'>
      <div className='cars-header'>
        <div className='header-content'>
          <div className='title-section'>
            <h1 className='page-title'>🚗 Mis Vehículos</h1>
            <p className='page-subtitle'>Gestiona tu flota de vehículos registrados</p>
          </div>
          
          <div className='header-actions'>
            <button className='add-car-btn' onClick={handleClick}>
              <span className='btn-icon'>➕</span>
              Agregar Vehículo
            </button>
          </div>
        </div>
      </div>

      {mostrarAddCars && (
        <div className='add-cars-modal'>
          <div className='modal-content'>
            <button className='close-modal' onClick={() => setMostrarAddCars(false)}>
              ✕
            </button>
            <AddCars actualizarLista={getData} />
          </div>
        </div>
      )}

      <div className='cars-content'>
        {list.length === 0 ? (
          <div className='empty-state'>
            <div className='empty-icon'>🚗</div>
            <h3>No tienes vehículos registrados</h3>
            <p>Comienza agregando tu primer vehículo para gestionar tu flota</p>
            <button className='add-first-car-btn' onClick={handleClick}>
              Agregar Mi Primer Vehículo
            </button>
          </div>
        ) : (
          <>
            <div className='cars-stats'>
              <div className='stat-card'>
                <div className='stat-icon'>🚙</div>
                <div className='stat-info'>
                  <span className='stat-value'>{list.length}</span>
                  <span className='stat-label'>Vehículos totales</span>
                </div>
              </div>
              
              <div className='stat-card'>
                <div className='stat-icon'>🔑</div>
                <div className='stat-info'>
                  <span className='stat-value'>{list.length}</span>
                  <span className='stat-label'>Activos</span>
                </div>
              </div>
            </div>
            
            <div className='cars-grid'>
              {list.map((eachCar) => (
                <InfoCard 
                  key={eachCar._id} 
                  item={eachCar} 
                  onUpdate={handleUpdate} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CarList