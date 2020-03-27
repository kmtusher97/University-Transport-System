import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppData from "./AppData";
import Axios from "axios";

class BusRoute extends Component {
  constructor() {
    super();
    this.state = {
      routeList: []
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

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Table
          size="sm"
          bordered
          hover
          striped
          style={{ textAlign: "center", fontSize: "12px" }}
        >
          <thead>
            <tr>
              <th>Route Id</th>
              <th>Route</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.routeList.map((route, idx) => (
              <tr key={idx}>
                <td>{route.routeId}</td>
                <td style={{ textAlign: "left" }}>
                  {this.showRoute(route.routeDetail)}
                </td>
                <td>
                  <Link to={"/route/edit/" + route.routeId}>Edit</Link>
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

export default BusRoute;
