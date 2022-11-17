import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCallesDetailsService, updateCallesService } from '../../services/calles.service'

function CallesEdit() {
  const { calleId } = useParams()
  const navigate = useNavigate()

  const [ nameInput, setNameInput] = useState("")
  const [ numAparcamientosInput, setNumAparcamientosInput] = useState(0)
  const [ numOcupadosInput, setNumOcupadosInput] = useState(0)
  
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
      //setPositionMarkerInput(response.data.positionMarker)

    } catch (error) {
      console.log(error) 
      navigate("/error")
    }
  }

  const nameChange = (e) => setNameInput(e.target.value)
  const numAparcamientosChange = (e) => setNumAparcamientosInput(e.target.value)
  const numOcupadosChange = (e) => setNumOcupadosInput(e.target.value)
  //const positionMarkerChange = (e) => setPositionMarkerInput(e.target.value)

  const handleUpdate = async (event)=>{
    event.preventDefault()
    try {
      console.log(numOcupadosInput)
      const updateCalle = {
        name: nameInput,
        numAparcamientos: numAparcamientosInput,
        numOcupados: numOcupadosInput
        //positionMarker: positionMarkerInput
      }

      await updateCallesService(calleId, updateCalle)
      navigate(`/calles/${calleId}/details`)
      
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

        <label htmlFor="numOcupados">Ocupados:</label>
        <input value={numOcupadosInput} type="number" name='numOcupados' onChange={numOcupadosChange} />
        <br />         

        <button onClick={handleUpdate}>Editar Calle</button>
      </form>
    </div>
  )
}

export default CallesEdit