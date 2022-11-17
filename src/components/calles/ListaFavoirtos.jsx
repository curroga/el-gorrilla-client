import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { getCallesFavoritas } from '../../services/calles.service'

import { ClimbingBoxLoader } from "react-spinners"
import { Link } from 'react-router-dom'

function ListaFavoirtos() {

  const { user } = useContext(AuthContext)
  const [listaFavorita, setListaFavorita] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      const response = await getCallesFavoritas()
      console.log(response.data)
      setListaFavorita(response.data)
      setIsFetching(false)
      
    } catch (error) {
      console.log(error)
    }

  }

  if (isFetching === true){ 
    return(
       <div className="App"> 
        <div className="spinner">
          <ClimbingBoxLoader size={25} color={"#36d7b7"} />
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>Lista de Calles favoritas</h2>
      {listaFavorita.map((eachCalle) => {
        return (
          <Link key={eachCalle._id} to={`/calles/${eachCalle._id}/details`} >
            <p>{eachCalle.name}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default ListaFavoirtos