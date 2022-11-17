import React, { useEffect, useState } from 'react'
import AddCars from './AddCars'
import InfoCard from './InfoCard'
import { updateCarsService, deleteCarsService, getAllCarsService } from '../../services/cars.service'
import { useNavigate } from 'react-router-dom'
import { ClimbingBoxLoader } from "react-spinners"



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
    <div>
      <div>
        <button onClick={handleClick}>Añadir coche</button>
      { mostrarAddCars === true ? <AddCars actualizarLista={getData} /> :null}
      </div>
      <div className="infoCarsContainer">
        <h2>Mis coches</h2>
        {list.map((eachCar) => (
          <InfoCard key={eachCar._id} item={eachCar} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default CarList