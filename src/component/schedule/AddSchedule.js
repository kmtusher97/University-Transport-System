import React, { Component } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSchedule } from "../../actions/ScheduleActions";
import { getAllAvailableBuses } from "../../actions/BusActions";
import { getBusRoutes } from "../../actions/BusRouteActions";
import { getAllDriversInservice } from "../../actions/DriverActions";
import { getAllStuffsInservice } from "../../actions/StuffActions";

import classnames from "classnames";


class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: "",
      date: "",
      time: "",
      isComplete: "",
      bus: {},
      route: {},
      driver: {},
      stuff: "",
      errors: {}
    };
    this.getDateForInput = this.getDateForInput.bind(this);
    this.parseTimeString = this.parseTimeString.bind(this);
    this.showRoute = this.showRoute.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeSelectorHandler = this.onChangeSelectorHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllAvailableBuses();
    this.props.getBusRoutes();
    this.props.getAllDriversInservice();
    this.props.getAllStuffsInservice();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  getDateForInput = tmpDate => {
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

  parseTimeString = () => {
    let timeFormat = this.state.time.split(':');
    let tmpDate = new Date(this.state.date);
    tmpDate.setHours(timeFormat[0]);
    tmpDate.setMinutes(timeFormat[1]);
    return tmpDate;
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

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeSelectorHandler = (event, listName, fieldName) => {
    if (parseInt(event.target.value) !== -1) {
      this.setState({
        [event.target.name]: this.props[listName].find(
          element => (element[fieldName] === parseInt(event.target.value))
        )
      });
    } else {
      let tmp = { [fieldName]: "-1" };
      this.setState({ [event.target.name]: tmp });
    }
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const newSchedule = {
      scheduleId: this.state.scheduleId,
      date: this.parseTimeString(),
      isComplete: this.state.isComplete,
      bus: this.state.bus ? this.state.bus : {},
      route: this.state.route ? this.state.route : {},
      driver: this.state.driver ? this.state.driver : {},
      stuff: this.state.stuff ? this.state.stuff : null
    };
    this.props.createSchedule(newSchedule, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ paddingTop: "10px" }}>
        <Form onSubmit={this.onSubmitHandler}>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.date }
                  )}
                  name="date"
                  type="date"
                  value={this.state.date && this.getDateForInput(this.state.date)}
                  onChange={this.onChangeHandler}
                />
                {errors.date && (
                  <div className="invalid-feedback">
                    {errors.date}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.date }
                  )}
                  name="time"
                  type="time"
                  value={this.state.time}
                  onChange={this.onChangeHandler}
                />
                {errors.date && (
                  <div className="invalid-feedback">
                    {errors.date}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={7}>
              <Form.Group>
                <Form.Label>Route</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": (errors.route || errors.routeId) }
                  )}
                  as="select"
                  name="route"
                  value={this.state.route ? this.state.route.routeId : ""}
                  onChange={
                    (event) => this.onChangeSelectorHandler(event, "routes", "routeId")
                  }
                  style={{ fontSize: "12px" }}
                >
                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >
                    Select Route
                  </option>
                  {this.props.routes.map((route, idx) => (
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
                {(errors.route || errors.routeId) && (
                  <div className="invalid-feedback">
                    {(errors.route || errors.routeId)}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Bus</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": (errors.bus || errors.busId) }
                  )}
                  as="select"
                  name="bus"
                  value={this.state.bus ? this.state.bus.busId : ""}
                  onChange={
                    (event) => this.onChangeSelectorHandler(event, "availableBuses", "busId")
                  }
                  style={{ fontSize: "12px" }}
                >
                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >
                    Select Bus
                  </option>
                  {this.props.availableBuses.map((bus, idx) => (
                    <option
                      key={idx}
                      value={bus.busId}
                      style={{ fontSize: "12px" }}
                    >
                      {"BusId: " + bus.busId + ", Number: " + bus.number}
                    </option>
                  ))}
                </Form.Control>
                {(errors.bus || errors.busId) && (
                  <div className="invalid-feedback">
                    {(errors.bus || errors.busId)}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Driver</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": (errors.driver || errors.driverId) }
                  )}
                  as="select"
                  name="driver"
                  value={this.state.driver ? this.state.driver.driverId : ""}
                  onChange={
                    (event) => this.onChangeSelectorHandler(event, "drivers", "driverId")
                  }
                  style={{ fontSize: "12px" }}
                >
                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >
                    Select Driver
                  </option>
                  {this.props.drivers.map((driver, idx) => (
                    <option
                      key={idx}
                      value={driver.driverId}
                      style={{ fontSize: "12px" }}
                    >
                      {"DriverId: " + driver.driverId + ", Name: " + driver.user.firstName + " " + driver.user.lastName}
                    </option>
                  ))}
                </Form.Control>
                {(errors.driver || errors.driverId) && (
                  <div className="invalid-feedback">
                    {(errors.driver || errors.driverId)}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Stuff(Optional)</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": (errors.stuff || errors.stuffId) }
                  )}
                  as="select"
                  name="stuff"
                  value={this.state.stuff ? this.state.stuff.stuffId : ""}
                  onChange={
                    (event) => this.onChangeSelectorHandler(event, "stuffs", "stuffId")
                  }
                  style={{ fontSize: "12px" }}
                >
                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >
                    Select Stuff
                  </option>
                  {this.props.stuffs.map((stuff, idx) => (
                    <option
                      key={idx}
                      value={stuff.stuffId}
                      style={{ fontSize: "12px" }}
                    >
                      {"StuffId: " + stuff.stuffId + ", Name: " + stuff.user.firstName + " " + stuff.user.lastName}
                    </option>
                  ))}
                </Form.Control>
                {(errors.stuff || errors.stuffId) && (
                  <div className="invalid-feedback">
                    {(errors.stuff || errors.stuffId)}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Button
                variant="primary"
                type="submit"
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

AddSchedule.propTypes = {
  errors: PropTypes.object.isRequired,
  createSchedule: PropTypes.func.isRequired,
  getAllAvailableBuses: PropTypes.func.isRequired,
  getBusRoutes: PropTypes.func.isRequired,
  getAllDriversInservice: PropTypes.func.isRequired,
  getAllStuffsInservice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  availableBuses: state.bus.availableBuses,
  routes: state.busRoute.routes,
  drivers: state.driver.drivers,
  stuffs: state.stuff.stuffs
});

export default connect(
  mapStateToProps,
  {
    createSchedule,
    getAllAvailableBuses,
    getBusRoutes,
    getAllDriversInservice,
    getAllStuffsInservice
  }
)(AddSchedule);
