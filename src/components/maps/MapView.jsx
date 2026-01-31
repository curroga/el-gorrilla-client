import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapView({ detalles }) {
  return (
    <MapContainer
      center={[37.17913079459059, -5.775956770000562]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%', minHeight: '500px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {detalles.map((eachMarker) => {
        const plazasLibres = (eachMarker.numAparcamientos || 0) -
          (eachMarker.coches?.length || 0) -
          (eachMarker.numOcupados || 0) +
          (eachMarker.numLibres || 0);

        return (
          <Marker key={eachMarker._id} position={eachMarker.positionMarker}>
            <Popup>
              <div style={{ minWidth: '150px' }}>
                <strong style={{ fontSize: '1.1rem' }}>{eachMarker.name}</strong>
                <hr style={{ margin: '0.5rem 0', borderColor: '#e2e8f0' }} />
                <p style={{ margin: '0.25rem 0' }}>
                  🚗 Total: <strong>{eachMarker.numAparcamientos || 0}</strong>
                </p>
                <p style={{ margin: '0.25rem 0', color: plazasLibres > 0 ? '#16a34a' : '#dc2626' }}>
                  {plazasLibres > 0 ? '✅' : '❌'} Libres: <strong>{plazasLibres}</strong>
                </p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
}

export default MapView;