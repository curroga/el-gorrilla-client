import React, { useState } from 'react'
import { createCarsService } from '../services/cars.service'

function AddCars(props) {

  const [ modeloInput, setModeloInput ] = useState("")
  const [ matriculaInput, setMatriculaInput ] = useState("")
  const [ colorInput, setColorInput ] = useState("")

  const handleModeloChange = (e) => setModeloInput(e.target.value)
  const handleMatriculaChange = (e) => setMatriculaInput(e.target.value)
  const handleColorChange = (e) => setColorInput(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCar = {
      modelo: modeloInput,
      matricula: matriculaInput,
      color: colorInput
    }
    try {
      await createCarsService(newCar)

      props.actualizarLista()
      
    } catch (error) {
      
    }
  }


  return (
    <div>
      <h3>Añadir nuevo coche</h3>
      <form>
        <label htmlFor="modelo">Modelo:</label>
        <input value={modeloInput} type="text" name="modelo" onChange={handleModeloChange} />
        <br />

        <label htmlFor="matricula">Matricula:</label>
        <input value={matriculaInput} type="text" name="matricula" onChange={handleMatriculaChange} />
        <br />

        <label htmlFor="color">Color:</label>
        <input value={colorInput} type="text" name="color" onChange={handleColorChange} />
        <br />

        <button onClick={handleSubmit}>Agregar</button>
      </form>
    </div>
  )
}

export default AddCars