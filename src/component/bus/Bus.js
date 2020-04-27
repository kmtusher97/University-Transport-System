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

    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }

    this.state = {
      busList: [],
      pageNo: tmpPageNo
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
        if (
          this.state.pageNo <= 0 ||
          this.state.pageNo * 30 - this.state.busList.length > 30
        ) {
          this.setState({
            busList: []
          });
        }
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
    const upperBound = this.state.pageNo * 30;
    const lowerBound = (this.state.pageNo - 1) * 30 + (this.state.pageNo > 1 ? 1 : 0);

    return (
      <Row>
        <BusTopMenuBar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(this.state.busList.length / 30) +
              (this.state.busList.length % 30 > 0 ? 1 : 0)
          }}
        />
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
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                  <tr key={idx}>
                    <td>{bus.busId}</td>
                    <td>{bus.number}</td>
                    <td>{bus.oilTankCapacity}</td>
                    <td>{bus.oilInTank}</td>
                    <td>{bus.gasCylinderCapacity}</td>
                    <td>{bus.gasInCylinder}</td>
                    <td>{bus.isAvailable === true ? "YES" : "NO"}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/bus/edit/" + bus.busId,
                          busId: bus.busId,
                          returnLink: window.location.pathname
                        }}
                      >
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
                ) : null
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default Bus;
