import ListaFavoirtos from "../components/ListaFavoirtos"
import CarList from "./cars/CarList"

function Profile() {
  
  

  return (
    <div>

      <div>
        <ListaFavoirtos />
      </div>

      <div>
        <CarList />
      </div>
      <h4>Este es tu perfil</h4>
      <p>mostrar mis </p>
      <p>boton que me mande a cambiar los datos del usario o la contraseña</p>      
      <p>Lista de mis calles favoritas</p>
      <p>mostar el componente coches  y meterle el boton de dejar el aparcamiento</p>
    </div>
  )
}

export default Profile