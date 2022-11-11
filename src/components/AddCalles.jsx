import React from 'react'
import { useState } from 'react'
import { createCallesService } from '../services/calles.service'


function AddCalles(props) {

  const [ nameInput, setNameInput] = useState("")
  const [ numAparcamientosInput, setNumAparcamientosInput] = useState(0)
  const [ positionMarkerInput, setPositionMarkerInput] = useState([])

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlenumAparcamientosChange = (e) => setNumAparcamientosInput(e.target.value)
  const handlePositionMarkerChange = (e) => setPositionMarkerInput(e.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newCalle = {
      name: nameInput,
      numAparcamientos: numAparcamientosInput,
      positionMarker: positionMarkerInput
    }
    try {
      await createCallesService(newCalle)

      props.actualizarLista()

    } catch (error) {
      
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Nombre:</label>
        <input value={nameInput} type="text" name='name' onChange={handleNameChange} />
        <br />

        <label htmlFor="numAparcamientos">Nº Aparcamientos:</label>
        <input value={numAparcamientosInput} type="number" name='numAparcamientos' onChange={handlenumAparcamientosChange} />
        <br />

        <label htmlFor="positionMarker">Posicion de la marca:</label>
        <input checked={positionMarkerInput} type="number" name='positionMarker' onChange={handlePositionMarkerChange} />
        <br />

        <button onClick={handleSubmit}>Agregar</button>
      </form>
    </div>
  )
}

export default AddCalles