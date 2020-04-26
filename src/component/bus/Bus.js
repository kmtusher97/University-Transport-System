import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";

import Appdata from "../AppData";
import Axios from "axios";

import BusTopMenuBar from "./BusTopMenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


class Bus extends Component {
  constructor() {
    super();
    this.state = {
      busList: []
    };
  }

  componentDidMount = () => {
    let url = `${Appdata.restApiBaseUrl}/bus/all`;
    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({
          busList: data
        });
      });
  };

  deleteBus = busId => {
    let url = `${Appdata.restApiBaseUrl}/bus/deleteById/${busId}`;
    Axios.delete(url, null)
      .then(response => response.data)
      .then(data => {
        window.location.reload();
      });
  };

  render() {
    return (
      <Row>
        <BusTopMenuBar />
        <Col md={12} style={{ paddingTop: "10px" }}>
          <Table size="sm" bordered hover striped>
            <thead style={{ textAlign: "center", fontSize: "12px" }}>
              <tr>
                <th>Bus Id</th>
                <th>Number</th>
                <th>Oil Tank Capacity</th>
                <th>Oil in Tank</th>
                <th>Gas Cylinder Capacity</th>
                <th>Gas in Cylinder</th>
                <th>Is Available</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {this.state.busList.map((bus, idx) => (
                <tr key={idx}>
                  <td>{bus.busId}</td>
                  <td>{bus.number}</td>
                  <td>{bus.oilTankCapacity}</td>
                  <td>{bus.oilInTank}</td>
                  <td>{bus.gasCylinderCapacity}</td>
                  <td>{bus.gasInCylinder}</td>
                  <td>{bus.isAvailable === "true" ? "YES" : "NO"}</td>
                  <td>
                    <Link to={"/bus/edit/" + bus.busId}>
                      <Button
                        size="sm"
                        variant="outline-success"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => this.deleteBus(bus.busId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default Bus;
