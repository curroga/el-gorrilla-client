import React, { useState } from "react";

function InfoCard({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false)

  function FormEdit(){
    const [modeloInput, setModeloInput] = useState(item.modelo)
    const [matriculaInput, setMatriculaInput] = useState(item.matricula)
    const [colorInput, setColorInput] = useState(item.color)

    function handleSubmit(e) {
      e.preventDefault();
    }

    const handleModeloChange = (e) => setModeloInput(e.target.value)
    const handleMatricula = (e) => setMatriculaInput(e.target.value)
    const handleColor = (e) => setColorInput(e.target.value)

    const newCar = {
      modelo: modeloInput,
      matricula: matriculaInput,
      color: colorInput
    }

    const handleClickUpdateCar = () => {
      onUpdate(item._id, newCar)
      setIsEdit(false)
    }

    return (
      <div className='edit-form-container'>
        <div className='edit-form-header'>
          <h4>✏️ Editar Vehículo</h4>
          <button className='cancel-edit-btn' onClick={() => setIsEdit(false)}>
            ✕
          </button>
        </div>
        
        <form className='edit-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="modelo">🚙 Modelo:</label>
            <input 
              type="text" 
              name='modelo' 
              onChange={handleModeloChange} 
              value={modeloInput}
              placeholder="Ej: Toyota Corolla"
            />
          </div>

          <div className='form-group'>
            <label htmlFor="color">🎨 Color:</label>
            <input 
              type="text" 
              name='color' 
              onChange={handleColor} 
              value={colorInput}
              placeholder="Ej: Rojo"
            />
          </div>
          
          <div className='form-group'>
            <label htmlFor="matricula">🔢 Matrícula:</label>
            <input 
              type="text" 
              name='matricula' 
              onChange={handleMatricula} 
              value={matriculaInput}
              placeholder="Ej: 1234ABC"
            />
          </div>
          
          <div className='form-actions'>
            <button type='button' className='save-btn' onClick={handleClickUpdateCar}>
              <span>✔️</span>
              Guardar Cambios
            </button>
            <button type='button' className='cancel-btn' onClick={() => setIsEdit(false)}>
              <span>❌</span>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }
  function InfoElement(){
    return (
      <div className='car-card'>
        <div className='car-card-header'>
          <div className='car-icon'>🚗</div>
          <div className='car-title'>
            <h4 className='car-model'>{item.modelo}</h4>
            <span className='car-plate'>{item.matricula}</span>
          </div>
        </div>
        
        <div className='car-details'>
          <div className='detail-item'>
            <span className='detail-icon'>🎨</span>
            <div className='detail-info'>
              <span className='detail-label'>Color</span>
              <span className='detail-value'>{item.color}</span>
            </div>
          </div>
          
          <div className='detail-item'>
            <span className='detail-icon'>🔢</span>
            <div className='detail-info'>
              <span className='detail-label'>Matrícula</span>
              <span className='detail-value'>{item.matricula}</span>
            </div>
          </div>
          
          <div className='detail-item'>
            <span className='detail-icon'>📅</span>
            <div className='detail-info'>
              <span className='detail-label'>Estado</span>
              <span className='detail-value status-active'>Activo</span>
            </div>
          </div>
        </div>
        
        <div className='car-actions'>
          <button className='edit-btn' onClick={() => setIsEdit(true)}>
            <span>✏️</span>
            Editar
          </button>
          <button className='delete-btn' onClick={() => onDelete(item._id)}>
            <span>🗑️</span>
            Eliminar
          </button>
        </div>
      </div>
    )
  }

  return <div>{isEdit ? <FormEdit /> : <InfoElement />}</div>    
  
}

export default InfoCard;
