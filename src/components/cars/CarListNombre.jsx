import React, { useEffect, useState } from 'react'

import { getAllCarsService } from '../../services/cars.service'

import { ClimbingBoxLoader } from "react-spinners"
import { updateCochesEnCallesService, deleteCochesEnCallesService } from '../../services/calles.service'

import { useNavigate } from 'react-router-dom'

function CarListNombre( {calleId, actualizar} ) { 
  
  const navigate = useNavigate()

  //1. creamos el estado que almacena la data de la API
  const [list, setList] = useState([])
  const [isFetching, setIsFetching] = useState(true)   

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
      navigate("/error")
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

  const handleAparcar = async (cocheId) => {
    
    console.log("Aqui mi id del coche para aparcar", cocheId)
    console.log("Aqui mi id de la calle para aparcar", calleId)
    
    try {
      await updateCochesEnCallesService(calleId, cocheId)
      
      actualizar()
    } catch (error) {
      console.log(error)
      navigate("/error")
    }

  }
  const handleQuitar = async (cocheId) => {
    console.log("Aqui mi id del coche para quitar coche", cocheId)
    console.log("Aqui mi id de la calle para quitar coche", calleId)
    
    try {
      await deleteCochesEnCallesService(calleId, cocheId)
      navigate(`/calles/${calleId}/details`) 
      actualizar()
    } catch (error) {
      console.log(error)
      navigate("/error")
    }

  }

  //5. renderizamos
  return (
    <div>      
      <div className="infoCarsListContainer">

        {list.map((eachCar) => (
          <div key={eachCar._id}>
            <span>
             <strong>{eachCar.modelo}</strong> 
            </span>
            <button onClick={() => handleAparcar(eachCar._id)} >Aparcar</button>
            <button onClick={() => handleQuitar(eachCar._id)}>Dejar Aparcamiento</button>
          </div>
        ))}

      </div>
    </div>
  )
}
  


export default CarListNombre