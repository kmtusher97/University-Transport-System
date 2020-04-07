import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

import AppData from "./AppData";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import ScheduleTopMenuBar from "./ScheduleTopMenuBar";
import ScheduleTableActionMenuBar from "./ScheduleTableActionMenuBar";

class Schedule extends Component {
  constructor(props) {
    super(props);
    const pathNameComponents = window.location.pathname.split("/");
    let tmpN = 1;
    if (pathNameComponents.length === 4) {
      tmpN = parseInt(pathNameComponents[3]);
    }

    this.state = {
      scheduleList: [],
      n: tmpN,
      totalPageCount: 0,
      target: null,
      show: false,
      deleteId: -1
    };

    this.ref1 = React.createRef();

    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.abortDelete = this.abortDelete.bind(this);
    this.deleteScheduleConfirmation = this.deleteScheduleConfirmation.bind(this);
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

    url = `${AppData.restApiBaseUrl}/schedule/totalCount`;
    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        this.setState({
          totalPageCount: parseInt(data / 30) + (data % 30 !== 0 ? 1 : 0)
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

  deleteScheduleConfirmation = (event, assignmentId) => {
    this.setState({
      target: event.target,
      show: true,
      deleteId: assignmentId
    });
  };

  deleteSchedule = event => {
    if (this.state.deleteId !== -1) {
      let url = `${AppData.restApiBaseUrl}/schedule/deleteById/${this.state.deleteId}`;
      Axios.delete(url);
      window.location.reload();
    }
    this.setState({
      target: null,
      show: false,
      deleteId: -1
    });
  };

  abortDelete = event => {
    this.setState({
      target: null,
      show: false,
      deleteId: -1
    });
  };

  render() {
    return (
      <div>
        <ScheduleTopMenuBar
          data={{
            pageNo: this.state.n,
            pageCount: this.state.totalPageCount
          }}
        />
        <Row>
          <Col md={12} ref={this.ref1}>
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
                      {(this.state.n - 1) * 30 + idx + 1}
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
                    <td style={{ textAlign: "center" }}>
                      <Link to={"/schedule/edit/" + schedule.assignmentId}>
                        <Button size="sm" variant="outline-success">
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                      </Link>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <ScheduleTableActionMenuBar
                        data={{
                          show: this.state.show,
                          target: this.state.target,
                          schedule: schedule
                        }}
                        ref1={this.ref1}
                        deleteScheduleConfirmation={this.deleteScheduleConfirmation}
                        deleteSchedule={this.deleteSchedule}
                        abortDelete={this.abortDelete}
                      />
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