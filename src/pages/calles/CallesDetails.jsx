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

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function CallesDetails() {
  const { isAdminIn, user } = useContext(AuthContext);

  const { calleId } = useParams();
  const navigate = useNavigate();

  //1. crear el estado donde estaran los detalles
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //console.log("detalles del owner", details.coches[0].owner)
  console.log("detalles del user", user._id);

  //2. buscar la informacion de la BD
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getCallesDetailsService(calleId);
      console.log(response.data);
      //3. actualizar el estado de la data
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  //4. clausula de guardia
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
      console.log("elemento borrado");
      navigate("/calles");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div className="calles-container-body">
      {isAdminIn === true ? (
        <Card style={{ width: "18rem", marginTop: "10px" }}>
          <Card.Header
            style={{
              backgroundColor: "#68ec57",
              color: "rgb(87, 87, 240)",
              fontWeight: "bold",
            }}
          >
            Calle: {details.name}
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: "white" }}>
              <p>Numero de coches: {details.coches.length}</p>
              <p>Aparcamientos agregados por el admin: {details.numOcupados}</p>
              <p>Aparcamientos liberados por el admin: {details.numLibres}</p>
              <p>Los coches de esta calle:</p>
              {details.coches.map((eachCar) => {
                return (
                  <ul key={eachCar._id}>
                    <li>{eachCar.modelo}</li>
                  </ul>
                );
              })}

              <div style={{display: "flex", justifyContent: "space-between"}}>
              <Button variant="outline-primary">
                <Link
                  style={{ textDecoration: "none", color: "" }}
                  to={`/calles/${details._id}/edit`}
                >
                  Ir a editar
                </Link>
              </Button>
              <Button variant="outline-dark" onClick={handleDelete}>
                Borrar
              </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : null}

      <div>
        <CarListNombre calleId={calleId} actualizar={getData} />
      </div>

      <div>
        <MapViewDetails detalles={details} />
      </div>
    </div>
  );
}

export default CallesDetails;
