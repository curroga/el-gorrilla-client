import React, { useEffect, useState, useContext } from 'react'
import AddCalles from '../../components/AddCalles'
import { Link } from 'react-router-dom'
import { getAllCallesService } from '../../services/calles.service'
import { ClimbingBoxLoader } from "react-spinners"
import { AuthContext } from "../../context/auth.context"
import Search from '../../components/Search'
import MapView from '../../components/MapView'

function CallesList() {

  const { isAdminIn } = useContext(AuthContext)

  //1. creamos el estado que almacena la data de la API
  const [list, setList] = useState([])
  const [filterList, setFilterList] = useState([])
  const [ isFetching, setIsFetching] = useState(true)
  const [mostrarAddCalles, setMostrarAddCalles] = useState(false)
  const [mostrarMapa, setMostrarMapa] = useState(false)

  //2. llamar a la api
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      const response = await getAllCallesService()
      console.log(response)
      
      // 3. guardar la info en el estado
      setList(response.data)
      setFilterList(response.data)
      setIsFetching(false)
      
    } catch (error) {
      console.log(error)
    }
  }


  // 4. clausula de guardia
  if (isFetching === true){ 
    return(
       <div className="App"> 
        <div className="spinner">
          <ClimbingBoxLoader size={25} color={"#36d7b7"} />
        </div>
      </div>
    )
  }
  const filterCalles = (filterQuery) => {
    const filteredCalles = list.filter((eachCalle) => {
      return eachCalle.name.startsWith(filterQuery)
    })
    setFilterList(filteredCalles)
  }

  const handleClick = () => setMostrarAddCalles(!mostrarAddCalles)
  const handleClickMapa = () => setMostrarMapa(!mostrarMapa)


  //5. renderizar la data
  return (
    <div>
     
      <div>
        { isAdminIn === true ? (

          <div>
            <button onClick={handleClick}>Añadir calle</button>
          { mostrarAddCalles === true ? <AddCalles actualizarLista={getData} detalles={filterList} /> :null}
          </div>

          ) : null}

          <div>
            <Search filterCalles={filterCalles} />
          </div>

          <div>
            <h3>Listado de calles</h3>        
             {filterList.map((eachCalle) => {
               return (
                 <p key={eachCalle._id}>
                   <Link to={`/calles/${eachCalle._id}/details`}>{eachCalle.name}</Link>
                 </p>
              )  
           })}
          </div>

         <div>
          <button onClick={handleClickMapa}>mapa</button>
          { mostrarMapa === true ? <MapView detalles={filterList} /> :null}          
        </div>

      </div>   
    
    </div>
  )
}

export default CallesList