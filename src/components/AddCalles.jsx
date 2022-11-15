import React from 'react'
import { useState } from 'react'
import { createCallesService } from '../services/calles.service'
//import MapView from '../components/MapView'
import MapWithClickable from './MapWithClickable'


function AddCalles(props) {

  console.log(props)

  const [ nameInput, setNameInput] = useState("")
  const [ numAparcamientosInput, setNumAparcamientosInput] = useState(0)
  const [ positionMarkerInput, setPositionMarkerInput] = useState([37.17913079459059, -5.775956770000562 ])

  console.log(positionMarkerInput)

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlenumAparcamientosChange = (e) => setNumAparcamientosInput(e.target.value)
  // const handlePositionMarkerChange = (e) => setPositionMarkerInput(e.target.value)

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
      <h3>Añadir una nueva calle</h3>
      <form>
        <label htmlFor="name">Nombre:</label>
        <input value={nameInput} type="text" name='name' onChange={handleNameChange} />
        <br />

        <label htmlFor="numAparcamientos">Nº Aparcamientos:</label>
        <input value={numAparcamientosInput} type="number" name='numAparcamientos' onChange={handlenumAparcamientosChange} />
        <br />
        
        <div>
          <h3>Mapa</h3>
          <MapWithClickable detalles={props.detalles} posicionInicial={positionMarkerInput} />
        </div>

        <button onClick={handleSubmit}>Agregar</button>
      </form>
    </div>
  )
}

export default AddCalles