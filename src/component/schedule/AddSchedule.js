import React, { Component } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import AppData from "../AppData";
import Axios from "axios";

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: [],
      busList: [],
      driverList: [],
      stuffList: [],
      assignment: {
        assignmentId: null,
        date: null,
        departureTime: null,
        duration: null,
        bus: {
          busId: null
        },
        driver: {
          driverId: null
        },
        stuff1: null,
        stuff2: null,
        route: {
          routeId: null
        }
      },
      pathComponents: null,
      returnLocation: (
        this.props.location.returnLocation === null ||
        this.props.location.returnLocation === undefined
      ) ? "/" : this.props.location.returnLocation
    };
  }

  componentDidMount = () => {
    let url = `${AppData.restApiBaseUrl}/route//GLOBAL/getAll`;
    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({
          routeList: data
        });

        url = `${AppData.restApiBaseUrl}/bus/all`;
        Axios.get(url)
          .then(response => response.data)
          .then(data => {
            this.setState({
              busList: data
            });
            url = `${AppData.restApiBaseUrl}/driver/inService/all`;
            Axios.get(url)
              .then(response => response.data)
              .then(data => {
                this.setState({
                  driverList: data
                });
                url = `${AppData.restApiBaseUrl}/stuff/inService/all`;
                Axios.get(url)
                  .then(response => response.data)
                  .then(data => {
                    this.setState({
                      stuffList: data
                    });

                    this.setState({
                      pathComponents: window.location.pathname.split("/")
                    });

                    if (
                      this.state.pathComponents[2] === "edit" &&
                      this.state.pathComponents[3] !== undefined &&
                      this.state.pathComponents[3] !== null
                    ) {
                      url = `${AppData.restApiBaseUrl}/schedule/getById/${this.state.pathComponents[3]}`;
                      Axios.get(url)
                        .then(response => response.data)
                        .then(data => {
                          if (data !== null && data !== undefined) {
                            this.setState({
                              assignment: data
                            });
                          }
                        });
                    }
                  });
              });
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

  onChangeHandlerDate = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.date = event.target.value;
    this.setState({
      assignment: tmpAssgnment
    });
  };

  onChangeHandlerDepartureTime = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.departureTime = String(event.target.value) + ":00";
    this.setState({
      assignment: tmpAssgnment
    });
  };

  onChangeHandlerRoute = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.route = { routeId: event.target.value };
    this.setState({
      assignment: tmpAssgnment
    });
  };

  onChangeHandlerBus = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.bus.busId = event.target.value;
    this.setState({
      assignment: tmpAssgnment
    });
  };

  onChangeHandlerDriver = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.driver.driverId = event.target.value;
    this.setState({
      assignment: tmpAssgnment
    });
  };

  onChangeHandlerStuff1 = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.stuff1 = { stuffId: event.target.value };
    this.setState({
      assignment: tmpAssgnment
    });
  };

  onChangeHandlerStuff2 = event => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.stuff2 = { stuffId: event.target.value };
    this.setState({
      assignment: tmpAssgnment
    });
  };

  checkForm = () => {
    let tmpAssgnment = this.state.assignment;
    tmpAssgnment.duration = "01:00:00";
    this.setState({
      assignment: tmpAssgnment
    });
    if (this.state.assignment.date === null) {
      alert("Select Date!!!");
      return false;
    }
    if (this.state.assignment.departureTime === null) {
      alert("Select Departure Time!!!");
      return false;
    }
    if (this.state.assignment.route.routeId === null) {
      alert("Select Route!!!");
      return false;
    }
    if (this.state.assignment.bus.busId === null) {
      alert("Select Bus!!!");
      return false;
    }
    if (this.state.assignment.driver.driverId === null) {
      alert("Select Driver!!!");
      return false;
    }
    return true;
  };

  addSchedule = event => {
    event.preventDefault();
    if (this.checkForm()) {
      if (this.state.pathComponents[2] === "add") {
        let url = `${AppData.restApiBaseUrl}/schedule/add`;
        Axios.post(url, this.state.assignment)
          .then(response => response.data)
          .then(data => {
            if (data === null) {
              alert("Error!!!! Failed to add.");
            } else {
              window.location.replace("/schedule");
            }
          });
      } else if (this.state.pathComponents[2] === "edit") {
        let url = `${AppData.restApiBaseUrl}/schedule/update`;
        Axios.post(url, this.state.assignment)
          .then(response => response.data)
          .then(data => {
            if (data === null) {
              alert("Error!!!! Failed to edit.");
            } else {
              window.location.replace(this.state.returnLocation);
            }
          });
      }
    }
  };

  getDateForInout = tmpDate => {
    let date = new Date(tmpDate);
    return String(
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate()
    );
  };

  render() {
    return (
      <Container style={{ paddingTop: "10px" }}>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={
                    this.state.assignment.date !== null
                      ? this.getDateForInout(this.state.assignment.date)
                      : ""
                  }
                  onChange={this.onChangeHandlerDate}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  type="time"
                  required
                  value={
                    this.state.assignment.departureTime !== null
                      ? this.state.assignment.departureTime
                      : ""
                  }
                  onChange={this.onChangeHandlerDepartureTime}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Route</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  required
                  value={
                    this.state.assignment.route.routeId !== null
                      ? this.state.assignment.route.routeId
                      : ""
                  }
                  onChange={this.onChangeHandlerRoute}
                  style={{ fontSize: "12px" }}
                >
                  <option style={{ fontSize: "12px" }}>Select Route</option>
                  {this.state.routeList.map((route, idx) => (
                    <option
                      key={idx}
                      value={route.routeId}
                      style={{ fontSize: "12px" }}
                    >
                      {"Route " +
                        route.routeId +
                        ": " +
                        this.showRoute(route.routeDetail)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Bus</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  required
                  value={
                    this.state.assignment.bus.busId !== null
                      ? this.state.assignment.bus.busId
                      : ""
                  }
                  onChange={this.onChangeHandlerBus}
                  style={{ fontSize: "12px" }}
                >
                  <option style={{ fontSize: "12px" }}>Select Bus</option>
                  {this.state.busList.map((bus, idx) => (
                    <option
                      key={idx}
                      value={bus.busId}
                      style={{ fontSize: "12px" }}
                    >
                      {"Bus " + bus.busId + ": " + bus.number}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Driver</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  required
                  value={
                    this.state.assignment.driver.driverId !== null
                      ? this.state.assignment.driver.driverId
                      : ""
                  }
                  onChange={this.onChangeHandlerDriver}
                  style={{ fontSize: "12px" }}
                >
                  <option style={{ fontSize: "12px" }}>Select Driver</option>
                  {this.state.driverList.map((driver, idx) => (
                    <option
                      key={idx}
                      value={driver.driverId}
                      style={{ fontSize: "12px" }}
                    >
                      {"Driver " +
                        driver.driverId +
                        ": " +
                        driver.user.firstName +
                        " " +
                        driver.user.lastName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Stuff 1</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={
                    this.state.assignment.stuff1 !== null
                      ? this.state.assignment.stuff1.stuffId
                      : ""
                  }
                  onChange={this.onChangeHandlerStuff1}
                  style={{ fontSize: "12px" }}
                >
                  <option style={{ fontSize: "12px" }}>
                    Select Stuff1 (Optional)
                  </option>
                  {this.state.stuffList.map((stuff, idx) => (
                    <option
                      key={idx}
                      value={stuff.stuffId}
                      style={{ fontSize: "12px" }}
                    >
                      {"Stuff1 " +
                        stuff.stuffId +
                        ": " +
                        stuff.user.firstName +
                        " " +
                        stuff.user.lastName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Stuff 2</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={
                    this.state.assignment.stuff2 !== null
                      ? this.state.assignment.stuff2.stuffId
                      : ""
                  }
                  onChange={this.onChangeHandlerStuff2}
                  style={{ fontSize: "12px" }}
                >
                  <option style={{ fontSize: "12px" }}>
                    Select Stuff1 (Optional)
                  </option>
                  {this.state.stuffList.map((stuff, idx) => (
                    <option
                      key={idx}
                      value={stuff.stuffId}
                      style={{ fontSize: "12px" }}
                    >
                      {"Stuff2 " +
                        stuff.stuffId +
                        ": " +
                        stuff.user.firstName +
                        " " +
                        stuff.user.lastName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Button
                variant="primary"
                type="submit"
                onClick={this.addSchedule}
              >
                Submit
              </Button>
            </Col>
            <Col md={6}></Col>
            <Col md={3}>
              <Button
                variant="secondary"
                type="reset"
                style={{ float: "right" }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddSchedule;
