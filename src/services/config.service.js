import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})

// configuracion para asegurarnos de que en esta llamada(baseURL) va a estar el token y no de una manera expuesta, es decir cada vez que llamemos a ese url va a incluir el token
service.interceptors.request.use((config) => { // interceptar la llamada JUSTO ANTES DE QUE ESTA SALIENDO (en su momento mas seguro)

  //1. buscar el token en localStorage
  const authToken = localStorage.getItem("authToken") // el token lo sacamos del localStorage

  const tokenFull = `Bearer ${authToken}`

  //2. anexar el token a la solicitud
  if(authToken) {
    config.headers.authorization = tokenFull // enviamos el token
  }
  return config
})

export default service