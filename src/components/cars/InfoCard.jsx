import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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
    <form onSubmit={handleSubmit}>
        
        <label htmlFor="modelo">Modelo:</label>
        <input type="text" name='modelo' onChange={handleModeloChange} value={modeloInput} />
        <br />

        <label htmlFor="color">Color:</label>
        <input type="text" name='color' onChange={handleColor} value={colorInput} />
        <br />
        
        <label htmlFor="matricula">Matricula:</label>
        <input type="text" name='matricula' onChange={handleMatricula} value={matriculaInput} />
        <br />
        

        <button onClick={handleClickUpdateCar}>Actualizar</button>
    </form>
    );
  }
  function InfoElement(){
    return (
    <Card style={{ width: '18rem', margin:"10px" }}>
      <ListGroup variant="flush">
        <ListGroup.Item style={{ backgroundColor: "rgb(87, 87, 240)", color: "white" }}>Modelo: {item.modelo}</ListGroup.Item>
        <ListGroup.Item style={{ width: '18rem' }}>Color: {item.color}</ListGroup.Item>
        <ListGroup.Item style={{ width: '18rem' }}>Matricula: {item.matricula}</ListGroup.Item>
      </ListGroup>
      <Card.Body style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button variant="success" onClick={() => setIsEdit(true)}>Editar</Button>
        <Button variant="danger" onClick={(e) => onDelete(item._id) }>Borrar</Button>
      </Card.Body>
  </Card>
    )
  }

  return <div>{isEdit ? <FormEdit /> : <InfoElement />}</div>    
  
}

export default InfoCard;
