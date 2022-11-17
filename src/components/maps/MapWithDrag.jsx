import React from 'react'
import { MapContainer, TileLayer, Marker} from "react-leaflet"
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "../../styles/mapa.css"

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapWithDrag( props ) {

  console.log( props.coordinates )

  const handleDragMarker = (event) => {
    console.log(event.target)
    props.setCoordinates([event.target._latlng.lat, event.target._latlng.lng])
  }

  return (

    <div className="container-map">
      
      <MapContainer center={props.coordinates} zoom={18} scrollWheelZoom={true} className="mapa">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={props.coordinates} 
        draggable={true}
        // event handler recibe un objeto
        // propiedades será lo que identifica el tipo de evento
        eventHandlers={{
          dragend: handleDragMarker
        }}
      />

    </MapContainer>
     
    </div>
  )
}

export default MapWithDrag