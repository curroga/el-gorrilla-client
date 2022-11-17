import React, { useEffect, useState, useContext } from 'react'
import AddCalles from '../../components/calles/AddCalles'
import { Link } from 'react-router-dom'
import { getAllCallesService } from '../../services/calles.service'
import { ClimbingBoxLoader } from "react-spinners"
import { AuthContext } from "../../context/auth.context"
import Search from '../../components/calles/Search'
import MapView from '../../components/maps/MapView'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';

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
    <div className='calles-container-body'>
     
      <div>
        { isAdminIn === true ? (

          <div style={{margin: "50px 50px 50px 75px"}}>
            <Button variant="outline-primary" onClick={handleClick}>Añadir calle</Button>
          { mostrarAddCalles === true ? <AddCalles actualizarLista={getData} detalles={filterList} /> :null}
          </div>

          ) : null}

          <div style={{margin: "50px 50px 50px 30px"}}>
            <Search filterCalles={filterCalles} />
          </div>

          <Card style={{ width: "18rem" }}>
          <Card.Header style={{ backgroundColor: "#68ec57", color:"rgb(87, 87, 240)", fontWeight: "bold" }}>Lista de Calles</Card.Header> 
          <ListGroup variant="flush">      
             {filterList.map((eachCalle) => {
               return (
                 <ListGroup.Item key={eachCalle._id} style={{ backgroundColor:"white"}}>
                   <Link style={{ textDecoration: "none", color:"rgb(87, 87, 240)"}} to={`/calles/${eachCalle._id}/details`}>{eachCalle.name}</Link>
                 </ListGroup.Item>
              )  
           })}
           </ListGroup> 
          </Card>

         <div style={{margin: "50px 50px 50px 100px"}}>
          <Button variant="outline-primary" onClick={handleClickMapa}>mapa</Button>
          { mostrarMapa === true ? <MapView detalles={filterList} /> :null}          
        </div>

      </div>   
    
    </div>
  )
}

export default CallesList