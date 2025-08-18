import React from 'react'
import { useState } from 'react'
import { createCallesService } from '../../services/calles.service'
import MapWithClickable from '../maps/MapWithClickable'
import '../../styles/addCalles.css'


function AddCalles(props) {

  const [ nameInput, setNameInput] = useState("")
  const [ numAparcamientosInput, setNumAparcamientosInput] = useState(0)
  const [ positionMarkerInput, setPositionMarkerInput] = useState([37.17913079459059, -5.775956770000562 ])
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ currentStep, setCurrentStep ] = useState(1)

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlenumAparcamientosChange = (e) => setNumAparcamientosInput(e.target.value)
  const handlePositionMarkerChange = (newPosition) => setPositionMarkerInput(newPosition)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!nameInput.trim() || numAparcamientosInput <= 0) {
      alert('Por favor, completa todos los campos correctamente')
      return
    }

    setIsSubmitting(true)

    const newCalle = {
      name: nameInput.trim(),
      numAparcamientos: parseInt(numAparcamientosInput),
      positionMarker: positionMarkerInput
    }

    try {
      await createCallesService(newCalle)
      props.actualizarLista()
      
      // Reset form
      setNameInput('')
      setNumAparcamientosInput(0)
      setPositionMarkerInput([37.17913079459059, -5.775956770000562])
      setCurrentStep(1)
      
    } catch (error) {
      console.error('Error al crear la calle:', error)
      alert('Error al crear la calle. Inténtalo nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    console.log('nextStep clicked', { nameInput, numAparcamientosInput, currentStep })
    if (currentStep === 1 && (!nameInput.trim() || numAparcamientosInput <= 0)) {
      alert('Por favor, completa los datos básicos antes de continuar')
      return
    }
    setCurrentStep(2)
  }

  const prevStep = () => setCurrentStep(1)

  return (
    <div className='add-calles-container'>
      <div className='add-calles-header'>
        <h2>🆕 Agregar Nueva Calle</h2>
        <p>Completa la información para registrar una nueva calle de aparcamiento</p>
        
        <div className='progress-indicator'>
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className='step-number'>1</div>
            <span>Información Básica</span>
          </div>
          <div className='step-connector'></div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className='step-number'>2</div>
            <span>Ubicación</span>
          </div>
        </div>
      </div>

      <form className='add-calles-form' onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className='step-content step-1'>
            <div className='form-section' style={{ flex: 1 }}>
              <h3>📝 Datos de la Calle</h3>
              
              <div className='form-group'>
                <label htmlFor="name">🛣️ Nombre de la Calle</label>
                <input 
                  value={nameInput} 
                  type="text" 
                  name='name' 
                  onChange={handleNameChange}
                  placeholder="Ej: Calle Gran Vía, Avenida de la Constitución..."
                  required
                />
                <small>Introduce el nombre completo de la calle</small>
              </div>

              <div className='form-group'>
                <label htmlFor="numAparcamientos">🚗 Número de Plazas de Aparcamiento</label>
                <input 
                  value={numAparcamientosInput} 
                  type="number" 
                  name='numAparcamientos' 
                  onChange={handlenumAparcamientosChange}
                  min="1"
                  max="1000"
                  placeholder="Ej: 50"
                  required
                />
                <small>Indica cuántas plazas de aparcamiento tiene la calle</small>
              </div>

              <div className='form-preview'>
                <h4>🔍 Vista Previa</h4>
                <div className='preview-card'>
                  <div className='preview-item'>
                    <span className='preview-label'>Nombre:</span>
                    <span className='preview-value'>{nameInput || 'Sin especificar'}</span>
                  </div>
                  <div className='preview-item'>
                    <span className='preview-label'>Plazas:</span>
                    <span className='preview-value'>{numAparcamientosInput || 0} plazas</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='step-actions' style={{ 
              marginTop: 'auto',
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              borderTop: '1px solid #e2e8f0',
              padding: '1rem 0'
            }}>
              <button 
                type='button' 
                className='next-btn' 
                onClick={nextStep}
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginLeft: 'auto',
                  display: 'block'
                }}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className='step-content step-2'>
            <div className='form-section'>
              <h3>🗺️ Seleccionar Ubicación</h3>
              <p className='map-instructions'>
                📍 Haz clic en el mapa para seleccionar la ubicación exacta de la calle
              </p>
              
              <div className='location-info'>
                <div className='coord-display'>
                  <span className='coord-label'>Coordenadas seleccionadas:</span>
                  <span className='coord-value'>
                    Lat: {positionMarkerInput[0].toFixed(6)}, 
                    Lng: {positionMarkerInput[1].toFixed(6)}
                  </span>
                </div>
              </div>
              
              <div className='map-container'>
                <MapWithClickable 
                  detalles={props.detalles} 
                  posicionInicial={positionMarkerInput} 
                  updatePosition={handlePositionMarkerChange} 
                />
              </div>
            </div>
            
            <div className='step-actions'>
              <button type='button' className='prev-btn' onClick={prevStep}>
                ← Anterior
              </button>
              <button 
                type='submit' 
                className='submit-btn' 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className='loading-spinner'></span>
                    Creando...
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    Crear Calle
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AddCalles