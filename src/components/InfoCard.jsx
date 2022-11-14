import React, { useState } from "react";

function InfoCard({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false)

  function FormEdit(){

    const [modeloInput, setModeloInput] = useState(item.modelo)
    const [matriculaInput, setMatriculaInput] = useState(item.modelo)
    const [colorInput, setColorInput] = useState(item.modelo)

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
    <form onSubmit={handleSubmit}>
        
        <label htmlFor="modelo">Modelo:</label>
        <input type="text" name='modelo' onChange={handleModeloChange} value={modeloInput} />
        <br />

        <label htmlFor="matricula">Matricula:</label>
        <input type="text" name='matricula' onChange={handleMatricula} value={matriculaInput} />
        <br />
        
        <label htmlFor="color">Color:</label>
        <input type="text" name='color' onChange={handleColor} value={colorInput} />
        <br />

        <button onClick={handleClickUpdateCar}>Actualizar</button>
    </form>
    );
  }
  function InfoElement(){
    return <div>
    <h3>Modelo: {item.modelo}</h3>
    <p>Color: {item.color}</p>
    <p>Matricula: {item.matricula}</p>

    <button onClick={() => setIsEdit(true)}>Editar</button>
    <button onClick={(e) => onDelete(item._id) }>Borrar</button>
  </div>
  }

  return <div>{isEdit ? <FormEdit /> : <InfoElement />}</div>    
  
}

export default InfoCard;
