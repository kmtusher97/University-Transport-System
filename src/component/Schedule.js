import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

import AppData from "./AppData";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleList: [],
      n: 1
    };
  }

  componentDidMount = () => {
    let url = `${AppData.restApiBaseUrl}/schedule/GLOBAL/getSchedules/${this.state.n}`;
    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({
          scheduleList: data
        });
      });
  };

  showDate = dateToParse => {
    let date = new Date(dateToParse);
    let dateString = date.toDateString();
    return dateString;
  };

  showBus = bus => {
    let busDetailString = bus.busId + ", " + bus.number;
    return busDetailString;
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={3} style={{ padding: "5px", paddingLeft: "15px" }}>
            <Link to={"/schedule/add"}>
              <Button size="sm" variant="outline-primary">
                Add Schedule
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table size="sm" bordered striped hover>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Departure Time</th>

                  <th>Route No</th>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Stuff1</th>
                  <th>Stuff2</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.scheduleList.map((schedule, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "center" }}>
                      {schedule.assignmentId}
                    </td>
                    <td>{this.showDate(schedule.date)}</td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.departureTime}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.route.routeId}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {this.showBus(schedule.bus)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.driver.driverId}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.stuff1 === null ? "" : schedule.stuff1.stuffId}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.stuff2 === null ? "" : schedule.stuff2.stuffId}
                    </td>
                    <td>
                      <Link to={"/schedule/edit/" + schedule.assignmentId}>
                        <Button size="sm" variant="outline-success">
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button size="sm" variant="outline-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Schedule;
