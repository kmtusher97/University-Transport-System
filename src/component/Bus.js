import React, { Component } from "react";
import { Table } from "react-bootstrap";

import Appdata from "./AppData";
import Axios from "axios";
import { Link } from "react-router-dom";

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

  render() {
    return (
      <div style={{ paddingTop: "10px" }}>
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
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center", fontSize: "12px" }}>
            {this.state.busList.map((bus, idx) => (
              <tr key={idx}>
                <td>{bus.busId}</td>
                <td>{bus.number}</td>
                <td>{bus.oilTankCapacity}</td>
                <td>{bus.oilInTank}</td>
                <td>{bus.gasCylinderCapacity}</td>
                <td>{bus.gasInCylinder}</td>
                <td>{bus.isAvailable === "true" ? "YES" : "NO"}</td>
                <td>{bus.status}</td>
                <td>
                  <Link to={"/bus/edit/" + bus.busId}>Edit</Link>
                </td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Bus;
