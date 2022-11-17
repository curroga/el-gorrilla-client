import ListaFavoirtos from "../components/calles/ListaFavoirtos"
import CarList from "../components/cars/CarList"

import { useContext } from "react"
import { AuthContext } from '../context/auth.context'


function Profile() {  

  const { user } = useContext(AuthContext)

  console.log(user)
  

  return (
    <div>

      <h2>Bievenido a tu perfil {user.username}</h2>

      <div>
        <ListaFavoirtos />
      </div>

      <hr />

      <div>
        <CarList />
      </div>    
      
    </div>
  )
}

export default Profile