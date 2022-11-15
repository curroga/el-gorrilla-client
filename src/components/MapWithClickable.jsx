import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "../styles/mapa.css"
import { useMapEvents } from 'react-leaflet/hooks'



let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

// COMPONENT NEEDED TO DETECT CLICK EVENT AND RECORD POSITION
// CAN BE CREATED HERE OR IN SEPARATE FILE
function LocationDetector({setClickedPosition}) {
  useMapEvents({
    click: (event) => {
      console.log(event.latlng)
      const obj = event.latlng
      setClickedPosition([
        obj.lat.toFixed(5), 
        obj.lng.toFixed(5)
      ])
    },
  })
  return null
}

function MapWithClickable( {detalles}, {posicionInicial} ) {
  console.log(detalles)
  console.log(posicionInicial)
  const [ clickedPosition, setClickedPosition ] = useState(null)
  const [ center, setCenter ] = useState([37.17913, -5.775956])

  useEffect(() => {
    setCenter(clickedPosition)
  }, [clickedPosition])
  return (
    <div className="container-map">      
      <div>
      <MapContainer center={center} zoom={15} scrollWheelZoom={true} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationDetector setClickedPosition={setClickedPosition}/>

        {clickedPosition !== null && (
            <Marker position={clickedPosition}/>
          )}

        {detalles.map((eachMarker) => {
          return (
           <Marker key={eachMarker._id} position={eachMarker.positionMarker}>
             <Popup>
               Aparcamiento: <br /> Libre.
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