import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.service"

const AuthContext = createContext()

function AuthWrapper(props){
  // todos los estados y funciones globales
  const [isLoggedIn, setIsloggedIn] = useState(false) // verdadero o falso si el usuario esta logeado
  const [user, setUser ] = useState(null) // si necesimatos el id del usuario lo almacenamos aqui
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    authenticaUser()
  }, []) // comoponente que envuelve a App

  const authenticaUser = async () => { // ejecutar para validar el token del usuario y acutalizar los estados

    setIsFetching(true) // cambiar esto a true mientras se vuelve a validar el token (evita bug)

    try {

      const response = await verifyService() // esta info viene del payload del BE (req.payload)
      console.log(response)

      // una vez que tenemos validado el Token en FE
      setIsloggedIn(true)
      setUser(response.data)
      setIsFetching(false)
      
    } catch (error) {
      console.log(error)
      setIsloggedIn(false)
      setUser(null)
      setIsFetching(false)
    }

  }

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser
  }

  if (isFetching === true){ // clausula de guardia
    return(
       <div className="App">  {/*le doy className para que me mantenga todo los estilos en mi aplicacion*/}
          <h3>... Validando al Usuario</h3>
      </div>
    )
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}