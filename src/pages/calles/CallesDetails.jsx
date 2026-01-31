import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getCallesDetailsService,
  deleteCallesService,
} from "../../services/calles.service";

import { ClimbingBoxLoader } from "react-spinners";

import { AuthContext } from "../../context/auth.context";

import MapViewDetails from "../../components/maps/MapViewDetails";
import CarListNombre from "../../components/cars/CarListNombre";

import "../../styles/calles.css";

function CallesDetails() {
  const { isAdminIn, user } = useContext(AuthContext);

  const { calleId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getCallesDetailsService(calleId);
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <div className="spinner">
          <ClimbingBoxLoader size={25} color={"#36d7b7"} />
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteCallesService(calleId);
      navigate("/calles");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const plazasLibres =
    (details.numAparcamientos || 0) -
    (details.coches?.length || 0) -
    (details.numOcupados || 0) +
    (details.numLibres || 0);

  return (
    <div className="calles-container">
      {/* Header */}
      <div className="calles-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">📍 {details.name}</h1>
            <p className="page-subtitle">Detalles y gestión de aparcamiento</p>
          </div>

          <div className="header-actions">
            <Link to="/calles" className="map-toggle-btn">
              <span className="btn-icon">←</span>
              Volver a Calles
            </Link>
            {isAdminIn && (
              <>
                <Link
                  to={`/calles/${details._id}/edit`}
                  className="add-street-btn"
                >
                  <span className="btn-icon">✏️</span>
                  Editar
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <span className="btn-icon">🗑️</span>
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="add-calles-modal">
          <div className="modal-content delete-modal">
            <div className="delete-modal-content">
              <div className="delete-icon">⚠️</div>
              <h3>¿Eliminar esta calle?</h3>
              <p>
                Esta acción no se puede deshacer. Se eliminará "{details.name}"
                permanentemente.
              </p>
              <div className="delete-modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancelar
                </button>
                <button className="confirm-delete-btn" onClick={handleDelete}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="details-content">
        {/* Left Column - Stats & Cars */}
        <div className="details-sidebar">
          {/* Stats Card */}
          <div className="details-card stats-card">
            <div className="details-card-header">
              <h3>📊 Estadísticas</h3>
              <div
                className={`availability-badge ${plazasLibres > 0 ? "available" : "full"}`}
              >
                {plazasLibres > 0 ? "Disponible" : "Completo"}
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon-large">🚗</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {details.numAparcamientos || 0}
                  </span>
                  <span className="stat-label">Total plazas</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-large">✅</div>
                <div className="stat-info">
                  <span className="stat-number available-number">
                    {plazasLibres}
                  </span>
                  <span className="stat-label">Libres</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-large">🚙</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {details.coches?.length || 0}
                  </span>
                  <span className="stat-label">Ocupadas</span>
                </div>
              </div>

              {isAdminIn && (
                <div className="stat-item">
                  <div className="stat-icon-large">🔧</div>
                  <div className="stat-info">
                    <span className="stat-number">{details.numOcupados || 0}</span>
                    <span className="stat-label">Ajuste admin</span>
                  </div>
                </div>
              )}
            </div>

            {/* Parked Cars List */}
            {details.coches?.length > 0 && (
              <div className="parked-cars-section">
                <h4>🚘 Coches aparcados</h4>
                <div className="parked-cars-list">
                  {details.coches.map((eachCar) => (
                    <div key={eachCar._id} className="parked-car-item">
                      <span className="car-icon">🚗</span>
                      <span className="car-name">{eachCar.modelo}</span>
                      {eachCar.owner === user._id && (
                        <span className="my-car-badge">Tu coche</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* My Cars Card */}
          <CarListNombre
            calleId={calleId}
            actualizar={getData}
            cochesAparcados={details.coches}
          />
        </div>

        {/* Right Column - Map */}
        <div className="details-main">
          <div className="map-container details-map">
            <div className="map-header">
              <h3>🗺️ Ubicación</h3>
              <p>Ubicación exacta de {details.name}</p>
            </div>
            <div className="map-wrapper">
              <MapViewDetails detalles={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallesDetails;
