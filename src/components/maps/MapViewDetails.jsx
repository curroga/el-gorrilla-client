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

function MapViewDetails({ detalles }) {

  const { user } = useContext(AuthContext)

  const plazasLibres = (detalles.numAparcamientos || 0) -
    (detalles.coches?.length || 0) -
    (detalles.numOcupados || 0) +
    (detalles.numLibres || 0);

  return (
    <MapContainer
      center={detalles.positionMarker}
      zoom={17}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={detalles.positionMarker}>
        <Popup>
          <div style={{ minWidth: '150px' }}>
            <strong style={{ fontSize: '1.1rem' }}>{detalles.name}</strong>
            <hr style={{ margin: '0.5rem 0', borderColor: '#e2e8f0' }} />
            <p style={{ margin: '0.25rem 0' }}>
              🚗 Total: <strong>{detalles.numAparcamientos || 0}</strong>
            </p>
            <p style={{ margin: '0.25rem 0', color: '#16a34a' }}>
              ✅ Libres: <strong>{plazasLibres}</strong>
            </p>
            {detalles.coches?.filter(car => car.owner === user._id).length > 0 && (
              <>
                <hr style={{ margin: '0.5rem 0', borderColor: '#e2e8f0' }} />
                <p style={{ margin: '0.25rem 0', fontWeight: '600' }}>Tus coches:</p>
                {detalles.coches
                  .filter(car => car.owner === user._id)
                  .map((eachCar) => (
                    <p key={eachCar._id} style={{ margin: '0.15rem 0', paddingLeft: '0.5rem' }}>
                      🚙 {eachCar.modelo}
                    </p>
                  ))}
              </>
            )}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapViewDetails;