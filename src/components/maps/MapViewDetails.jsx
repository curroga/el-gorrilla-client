import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "../../styles/mapa.css"

import { AuthContext } from "../../context/auth.context"


let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapView( {detalles} ) {

  const { user } = useContext(AuthContext)
   
  return (
    <div className="container-map">      
      <div>
      <MapContainer center={detalles.positionMarker} zoom={19} scrollWheelZoom={false} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />        
        <Marker position={detalles.positionMarker}>
          <Popup>
           Nº de aparcamintos: {detalles.numAparcamientos} <br />
           Plazas Libres: {(detalles.numAparcamientos)-(detalles.coches.length)-(detalles.numOcupados)+(detalles.numLibres)} <br />
           Coches:
           {detalles.coches.map((eachCar) => {
             return(
               <ul key={eachCar._id}>
                 {eachCar.owner === user._id ? <li>{eachCar.modelo}</li> : null }                    
               </ul>
             ) 
            })} 
         </Popup>
       </Marker>             
          
      </MapContainer>
      </div>
    </div>
  );
}

export default MapView;