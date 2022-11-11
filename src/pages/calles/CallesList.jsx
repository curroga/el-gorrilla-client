import React, { useEffect, useState } from 'react'
import AddCalles from '../../components/AddCalles'
import { Link } from 'react-router-dom'
import { getAllCallesService } from '../../services/calles.service'
import { ClimbingBoxLoader } from "react-spinners"

function CallesList() {

  //1. creamos el estado que almacena la data de la API
  const [list, setList] = useState([])
  const [ isFetching, setIsFetching] = useState(true)

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


  //5. renderizar la data
  return (
    <div>

      <AddCalles actualizarLista={getData} />
      <h3>Listado de calles</h3>
      
      {list.map((eachCalle) => {
        return (
          <p key={eachCalle._id}>
            <Link to={`/calles/${eachCalle._id}/details`}>{eachCalle.name}</Link>
          </p>
        )

      })}
    </div>
  )
}

export default CallesList