import React, { Component } from "react";
import { Table, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppData from "../AppData";
import Axios from "axios";
import BusRouteTopMenuBar from "./BusRouteTopMenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

class BusRoute extends Component {
  constructor() {
    super();

    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }

    this.state = {
      routeList: [],
      pageNo: tmpPageNo
    };
  }

  componentDidMount = () => {
    let url = `${AppData.restApiBaseUrl}/route/GLOBAL/getAll`;

    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({
          routeList: data
        });
      });
  };

  showRoute = stoppageList => {
    let routeString = "";
    for (let i = 0, sz = stoppageList.length; i < sz; i++) {
      let stoppage = stoppageList[i];
      routeString = routeString.concat(stoppage.stoppageName);
      if (i + 1 < sz) routeString = routeString.concat(", ");
    }
    return routeString;
  };

  deleteRoute = routeId => {
    let url = `${AppData.restApiBaseUrl}/route/delete/${routeId}`;
    Axios.delete(url, null)
      .then(response => response.data)
      .then(data => {
        url = `${AppData.restApiBaseUrl}/route/GLOBAL/getAll`;
        Axios.get(url)
          .then(response => response.data)
          .then(data => {
            this.setState({
              routeList: data
            });
          });

      });
  };

  render() {
    const rowsPerPage = 20;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);

    return (
      <Row>
        <BusRouteTopMenuBar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(this.state.routeList.length / rowsPerPage) +
              (this.state.routeList.length % rowsPerPage > 0 ? 1 : 0)
          }}
        />
        <Col md={12} style={{ paddingTop: "10px" }}>
          <Table
            size="sm"
            bordered
            hover
            striped
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>SL</th>
                <th>Route No</th>
                <th>Route</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.routeList.map((route, idx) => (
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{route.routeId}</td>
                    <td style={{ textAlign: "left" }}>
                      {this.showRoute(route.routeDetail)}
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: "/route/edit/" + route.routeId,
                          routeId: route.routeId,
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
                        onClick={() => this.deleteRoute(route.routeId)}
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

export default BusRoute;
