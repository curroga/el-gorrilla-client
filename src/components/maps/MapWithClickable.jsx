import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "../../styles/mapa.css"
import { useMapEvents } from 'react-leaflet/hooks'



let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon


// componentes necesitan detectar click event y recordar la posicion
// SE PUEDE CREAR AQUÍ O EN UN ARCHIVO SEPARADO
function LocationDetector({setClickedPosition, updatePosition}) {
  useMapEvents({
    click: (event) => {
      console.log(event.latlng)
      console.log(updatePosition)
      const obj = event.latlng
      setClickedPosition([
        obj.lat.toFixed(5), 
        obj.lng.toFixed(5)
      ])
      console.log([obj.lat, obj.lng])
      updatePosition([obj.lat, obj.lng])
    },
  })
  return null
}

function MapWithClickable( { detalles, posicionInicial, updatePosition } ) {
  //console.log(detalles)
  //console.log(posicionInicial)
  console.log(updatePosition)
  const [ clickedPosition, setClickedPosition ] = useState(null)
  const [ center, setCenter ] = useState(posicionInicial)

  useEffect(() => {
    setCenter(clickedPosition)
  }, [clickedPosition])
  return (
    <div>      
      <div>
      <MapContainer center={center} zoom={15} scrollWheelZoom={true} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationDetector setClickedPosition={setClickedPosition} updatePosition={updatePosition} />

        {clickedPosition !== null && (
            <Marker position={clickedPosition}/>
          )}

        {detalles.map((eachMarker) => {
          return (
           <Marker key={eachMarker._id} position={eachMarker.positionMarker}>
             <Popup>
               Calle: {eachMarker.name}
             </Popup>
           </Marker>             
          )
        })}

      </MapContainer>
      </div>
    </div>
  );
}

export default MapWithClickable;