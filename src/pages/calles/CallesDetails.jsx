import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getCallesDetailsService, deleteCallesService } from '../../services/calles.service'

import { ClimbingBoxLoader } from "react-spinners"

import { AuthContext } from "../../context/auth.context"

import MapViewDetails from '../../components/maps/MapViewDetails'
import CarListNombre from '../../components/CarListNombre'

function CallesDetails() {

  const { isAdminIn } = useContext(AuthContext)

  const { calleId } = useParams()
  const navigate = useNavigate()

  //1. crear el estado donde estaran los detalles 
  const [details, setDetails] = useState(null)
  const [isFetching, setIsFetching] = useState(true)  

  //2. buscar la informacion de la BD 
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      const response = await getCallesDetailsService(calleId)
      console.log(response.data)
      //3. actualizar el estado de la data
      setDetails(response.data)
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

  const handleDelete = async () => {
    
    try {
      await deleteCallesService(calleId)      
      console.log("elemento borrado")
      navigate("/calles")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  return (
    <div>
      <h3>Detalles de la calle</h3>
        <div>
          <div>
             <h4>Calle: {details.name}</h4>
             <p>Nº de Aparcamientos: {details.numAparcamientos}</p>
             <p>Libres: {details.numLibres}</p>
             <p>Ocupados: {(details.numAparcamientos)-(details.numLibres)}</p>
             <p>Coches:</p>
             {details.coches.map((eachCar) => {
              return(
                <ul key={eachCar._id}>
                  <li>{eachCar.modelo}</li>
                </ul>
              ) 
             })}             
            {isAdminIn === true ? (
             <div>
               <button onClick={handleDelete}>Borrar</button>
               <Link to={`/calles/${details._id}/edit`}>Ir a editar</Link>
             </div>

            ): null}

          </div>

          <div>
            <h3>Listado de mis coches</h3>
            <CarListNombre calleId={calleId} />
          </div>

          <div>
            <h3>Mapa</h3>
            <MapViewDetails detalles={details} /> 
          </div>      
      
        </div>
    </div>
  )
}

export default CallesDetails