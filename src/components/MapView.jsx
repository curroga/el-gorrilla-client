import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "../styles/mapa.css"


let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapView( {detalles} ) {
  console.log(detalles)
  //const positionMapContainer = [37.17913079459059, -5.775956770000562]
  //const positionMarker = [37.17913079459059, -5.775956770000562]
  return (
    <div className="container-map">      
      <div>
      <MapContainer center={[37.17913079459059, -5.775956770000562]} zoom={15} scrollWheelZoom={true} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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

export default MapView;