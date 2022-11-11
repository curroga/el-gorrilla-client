import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCallesDetailsService, updateCallesService } from '../../services/calles.service'

function CallesEdit() {
  const { calleId } = useParams()
  const navigate = useNavigate()

  const [ nameInput, setNameInput] = useState("")
  const [ numAparcamientosInput, setNumAparcamientosInput] = useState(0)
  const [ positionMarkerInput, setPositionMarkerInput] = useState([])

  useEffect(() => {
    getData()     
  }, [])

  const getData = async () => {
    try {
      const response = await getCallesDetailsService(calleId)
      console.log(response.data)
      setNameInput(response.data.name)
      setNumAparcamientosInput(response.data.numAparcamientos)
      setPositionMarkerInput(response.data.positionMarker)

    } catch (error) {
      console.log(error) 
      navigate("/error")
    }
  }

  const nameChange = (e) => setNameInput(e.target.value)
  const numAparcamientosChange = (e) => setNumAparcamientosInput(e.target.value)
  const positionMarkerChange = (e) => setPositionMarkerInput(e.target.value)

  const handleUpdate = async (event)=>{
    event.preventDefault()
    try {
      const updateCalle = {
        name: nameInput,
        numAparcamientos: numAparcamientosInput,
        positionMarker: positionMarkerInput
      }

      await updateCallesService(calleId, updateCalle)
      navigate("/calles")
      
    } catch (error) {
      navigate("/error")
    }

  }


  return (
    <div>
      <h3>Edita la calle</h3>

      <form>
        <label htmlFor="name">Nombre:</label>
        <input value={nameInput} type="text" name='name' onChange={nameChange} />
        <br />

        <label htmlFor="numAparcamientos">Nº Aparcamientos:</label>
        <input value={numAparcamientosInput} type="number" name='numAparcamientos' onChange={numAparcamientosChange} />
        <br />

        <label htmlFor="positionMarker">Posicion de la marca:</label>
        <input value={positionMarkerInput} type="number" name='positionMarker' onChange={positionMarkerChange} />
        <br />

        <button onClick={handleUpdate}>Editar Calle</button>
      </form>
    </div>
  )
}

export default CallesEdit