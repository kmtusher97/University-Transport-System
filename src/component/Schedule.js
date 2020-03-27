import React, { Component } from "react";
import { Table } from "react-bootstrap";

import AppData from "./AppData";
import Axios from "axios";

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
      <div style={{ paddingTop: "10px" }}>
        <Table size="sm" bordered striped hover>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Departure Time</th>
              <th>Duration</th>
              <th>Route</th>
              <th>Bus</th>
              <th>Driver</th>
              <th>Stuff1</th>
              <th>Stuff2</th>
            </tr>
          </thead>
          <tbody>
            {this.state.scheduleList.map((schedule, idx) => (
              <tr key={idx} style={{ fontSize: "11px" }}>
                <td style={{ textAlign: "center" }}>{schedule.assignmentId}</td>
                <td>{this.showDate(schedule.date)}</td>
                <td style={{ textAlign: "center" }}>
                  {schedule.departureTime}
                </td>
                <td style={{ textAlign: "center" }}>{schedule.duration}</td>
                <td style={{ textAlign: "center" }}>
                  {schedule.route.routeId}
                </td>
                <td style={{ textAlign: "center" }}>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Schedule;
