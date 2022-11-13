import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "../styles/mapa.css"

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapView() {
  const positionMapContainer = [51.505, -0.09]
  const positionMarker = [[51.505, -0.09], [51.506, -0.09]]
  return (
    <div className="container-map">
      {/* <div className="titulo area">
        <h3>Mapa</h3>
      </div> */}
      <div>
      <MapContainer center={positionMapContainer} zoom={13} scrollWheelZoom={true} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionMarker[0]}>
          <Popup>
            Aparcamiento: <br /> Libre.
          </Popup>
        </Marker>
        <Marker position={positionMarker[1]}>
          <Popup>
            Aparcamiento: <br /> Ocupado.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
    </div>
  );
}

export default MapView;