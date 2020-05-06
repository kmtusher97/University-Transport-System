import React, { Component } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import classnames from "classnames";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSchedule, getSchedule } from '../../actions/ScheduleActions';
import { getAllAvailableBuses } from '../../actions/BusActions';
import { getBusRoutes } from '../../actions/BusRouteActions';
import { getAllDriversInservice } from '../../actions/DriverActions';
import { getAllStuffsInservice } from '../../actions/StuffActions';

class UpdateSchedule extends Component {
  constructor() {
    super();
    this.state = {
      scheduleId: "",
      date: "",
      isComplete: "",
      bus: {},
      route: {},
      driver: {},
      stuff: {},
      errors: {}
    };
    this.showRoute = this.showRoute.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeSelectorHandler = this.onChangeSelectorHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount = () => {
    const { scheduleId } = this.props.match.params;
    this.props.getSchedule(scheduleId, this.props.history);
    this.props.getAllAvailableBuses();
    this.props.getBusRoutes();
    this.props.getAllDriversInservice();
    this.props.getAllStuffsInservice();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      scheduleId,
      date,
      isComplete,
      bus,
      route,
      driver,
      stuff
    } = nextProps.schedule;

    this.setState({
      scheduleId,
      date,
      isComplete,
      bus,
      route,
      driver,
      stuff
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
      date: this.state.date,
      isComplete: this.state.isComplete,
      bus: this.state.bus,
      route: this.state.route,
      driver: this.state.driver,
      stuff: this.state.stuff
    };
    console.log(newSchedule);
    this.props.createSchedule(newSchedule, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ paddingTop: "10px" }}>
        <Form onSubmit={this.onSubmitHandler}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.date }
                  )}
                  name="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.onChangeHandler}
                />
                {errors.date && (
                  <div className="invalid-feedback">
                    {errors.date}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={8}>
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
                    value={""}
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
    )
  }
}

UpdateSchedule.propTypes = {
  errors: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
  createSchedule: PropTypes.func.isRequired,
  getAllAvailableBuses: PropTypes.func.isRequired,
  getBusRoutes: PropTypes.func.isRequired,
  getAllDriversInservice: PropTypes.func.isRequired,
  getAllStuffsInservice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  schedule: state.schedule.schedule,
  availableBuses: state.bus.availableBuses,
  routes: state.busRoute.routes,
  drivers: state.driver.drivers,
  stuffs: state.stuff.stuffs
});

export default connect(
  mapStateToProps,
  {
    createSchedule,
    getSchedule,
    getAllAvailableBuses,
    getBusRoutes,
    getAllDriversInservice,
    getAllStuffsInservice
  }
)(UpdateSchedule);