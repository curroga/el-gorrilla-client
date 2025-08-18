import React, { useState } from 'react'
import { createCarsService } from '../../services/cars.service'

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
      console.log(error)
    }
  }


  return (
    <div className='add-car-container'>
      <div className='add-car-header'>
        <h3>🆕 Agregar Nuevo Vehículo</h3>
        <p>Completa los datos de tu vehículo</p>
      </div>
      
      <form className='add-car-form'>
        <div className='form-group'>
          <label htmlFor="modelo">🚙 Modelo del Vehículo</label>
          <input 
            value={modeloInput} 
            type="text" 
            name="modelo" 
            onChange={handleModeloChange}
            placeholder="Ej: Toyota Corolla, Honda Civic..."
          />
        </div>

        <div className='form-group'>
          <label htmlFor="matricula">🔢 Matrícula</label>
          <input 
            value={matriculaInput} 
            type="text" 
            name="matricula" 
            onChange={handleMatriculaChange}
            placeholder="Ej: 1234ABC"
          />
        </div>

        <div className='form-group'>
          <label htmlFor="color">🎨 Color</label>
          <input 
            value={colorInput} 
            type="text" 
            name="color" 
            onChange={handleColorChange}
            placeholder="Ej: Rojo, Azul, Negro..."
          />
        </div>

        <button className='submit-btn' type='button' onClick={handleSubmit}>
          <span>✓</span>
          Agregar Vehículo
        </button>
      </form>
    </div>
  )
}

export default AddCars