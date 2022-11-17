import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { getCallesFavoritas } from '../../services/calles.service'

import { ClimbingBoxLoader } from "react-spinners"
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
    <Card style={{ width: "18rem" }}>
      <Card.Header style={{ backgroundColor: "#68ec57", color:"rgb(87, 87, 240)", fontWeight: "bold"}}>Lista de Calles favoritas</Card.Header>
      <ListGroup variant="flush">
      {listaFavorita.map((eachCalle) => {
        return (
          <ListGroup.Item key={eachCalle._id} style={{ backgroundColor:"white"}}>
          <Link style={{ textDecoration: "none", color:"rgb(87, 87, 240)"}}  to={`/calles/${eachCalle._id}/details`} >
            {eachCalle.name}
          </Link>
          </ListGroup.Item>
        )
      })}
      </ListGroup>
    </Card>
  )
}

export default ListaFavoirtos