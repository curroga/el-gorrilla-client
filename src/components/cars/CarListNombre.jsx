import React, { useEffect, useState } from 'react'

import { getAllCarsService } from '../../services/cars.service'

import { ClimbingBoxLoader } from "react-spinners"
import { updateCochesEnCallesService, deleteCochesEnCallesService } from '../../services/calles.service'

import { useNavigate } from 'react-router-dom'

import '../../styles/calles.css'

function CarListNombre({ calleId, actualizar, cochesAparcados = [] }) {

  const navigate = useNavigate()

  const [list, setList] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [loadingCarId, setLoadingCarId] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await getAllCarsService()
      setList(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  // Check if a car is parked in this street
  const isCarParked = (carId) => {
    return cochesAparcados.some(coche => coche._id === carId)
  }

  const handleAparcar = async (cocheId) => {
    setLoadingCarId(cocheId)
    try {
      await updateCochesEnCallesService(calleId, cocheId)
      actualizar()
    } catch (error) {
      console.log(error)
      navigate("/error")
    } finally {
      setLoadingCarId(null)
    }
  }

  const handleQuitar = async (cocheId) => {
    setLoadingCarId(cocheId)
    try {
      await deleteCochesEnCallesService(calleId, cocheId)
      actualizar()
    } catch (error) {
      console.log(error)
      navigate("/error")
    } finally {
      setLoadingCarId(null)
    }
  }

  if (isFetching === true) {
    return (
      <div className="details-card">
        <div className="details-card-header">
          <h3>🚗 Mis Vehículos</h3>
        </div>
        <div className="loading-container">
          <ClimbingBoxLoader size={15} color={"#667eea"} />
        </div>
      </div>
    )
  }

  return (
    <div className="details-card my-cars-card">
      <div className="details-card-header">
        <h3>🚗 Mis Vehículos</h3>
        <span className="count-badge">{list.length}</span>
      </div>

      {list.length === 0 ? (
        <div className="empty-cars-message">
          <p>No tienes vehículos registrados</p>
        </div>
      ) : (
        <div className="my-cars-list">
          {list.map((eachCar) => {
            const parked = isCarParked(eachCar._id)
            const isLoading = loadingCarId === eachCar._id

            return (
              <div key={eachCar._id} className={`my-car-card ${parked ? 'parked' : ''}`}>
                <div className="my-car-info">
                  <span className="my-car-icon">🚗</span>
                  <div className="my-car-details">
                    <span className="my-car-name">{eachCar.modelo}</span>
                    <span className="my-car-plate">{eachCar.matricula}</span>
                  </div>
                  {parked && <span className="parked-here-badge">Aquí</span>}
                </div>

                <div className="my-car-actions">
                  {parked ? (
                    <button
                      className="action-btn leave-btn"
                      onClick={() => handleQuitar(eachCar._id)}
                      disabled={isLoading}
                    >
                      {isLoading ? '...' : '🚪 Retirar'}
                    </button>
                  ) : (
                    <button
                      className="action-btn park-btn"
                      onClick={() => handleAparcar(eachCar._id)}
                      disabled={isLoading}
                    >
                      {isLoading ? '...' : '🅿️ Aparcar'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CarListNombre