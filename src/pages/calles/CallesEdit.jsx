import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCallesDetailsService, updateCallesService } from '../../services/calles.service'
import MapWithDrag from '../../components/maps/MapWithDrag'


import { ClimbingBoxLoader } from "react-spinners"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function CallesEdit() {
 

  const { calleId } = useParams()
  const navigate = useNavigate()

  const [ nameInput, setNameInput] = useState("")
  const [ numAparcamientosInput, setNumAparcamientosInput] = useState(0)
  const [ numOcupadosInput, setNumOcupadosInput] = useState(0)
  const [ numLibresInput, setNumLibresInput] = useState(0)
  const [isFetching, setIsFetching] = useState(true) 
  const [ coordinates, setCoordinates ] = useState([0, 0])

  console.log(coordinates)
  
  //const [ positionMarkerInput, setPositionMarkerInput] = useState(0) //! Preguntar

  useEffect(() => {
    getData()     
  }, [])

  const getData = async () => {
    try {
      const response = await getCallesDetailsService(calleId)
      console.log(response.data)
      setNameInput(response.data.name)
      setNumAparcamientosInput(response.data.numAparcamientos)
      setNumOcupadosInput(response.data.numOcupados)
      setNumLibresInput(response.data.numLibres)
      setCoordinates(response.data.positionMarker)
      setIsFetching(false)

    } catch (error) {
      console.log(error) 
      navigate("/error")
    }
  }

  const nameChange = (e) => setNameInput(e.target.value)
  const numAparcamientosChange = (e) => setNumAparcamientosInput(e.target.value)
  const numOcupadosChange = (e) => setNumOcupadosInput(e.target.value)
  const numLibresChange = (e) => setNumLibresInput(e.target.value)
  

  const handleUpdate = async (event)=>{
    event.preventDefault()
    try {
      console.log(numOcupadosInput)
      const updateCalle = {
        name: nameInput,
        numAparcamientos: numAparcamientosInput,
        numOcupados: numOcupadosInput,
        numLibres: numLibresInput,
        positionMarker: coordinates
      }

      await updateCallesService(calleId, updateCalle)
      navigate(`/calles/${calleId}/details`)
      
    } catch (error) {
      navigate("/error")
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
    <div className='calles-container-body'>

      <Form style={{color: "blue"}}>
        <h3>Edita la calle</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Nombre:</Form.Label>
        <Form.Control value={nameInput} type="text" name='name' onChange={nameChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Nº Aparcamientos:</Form.Label>
        <Form.Control value={numAparcamientosInput} type="number" name='numAparcamientos' onChange={numAparcamientosChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Aparcamientos agregados por el admin:</Form.Label>
        <Form.Control value={numOcupadosInput} type="number" name='numOcupados' onChange={numOcupadosChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Aparcamientos liberados por el admin:</Form.Label>
        <Form.Control value={numLibresInput} type="number" name='numLibres' onChange={numLibresChange} />
        </Form.Group>

        <Button variant="outline-success" onClick={handleUpdate}>Editar Calle</Button>

      </Form>
      <div>        
        <MapWithDrag coordinates={coordinates} setCoordinates={setCoordinates} />  
      </div>
    </div>
  )
}

export default CallesEdit