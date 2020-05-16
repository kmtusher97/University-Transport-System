import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/UserActions';
import {
  createBusRequisitions,
  getBusRequisition,
  getAllAvailableBuses
} from '../../actions/BusActions';
import { getAllDriversInservice } from '../../actions/DriverActions'
import { Container, Jumbotron, Form, Row, Button } from 'react-bootstrap';
import classnames from 'classnames';

class CreateBusRequisition extends Component {
  constructor() {
    super();
    let pathNameWords = window.location.pathname.split('/');
    this.state = {
      requisitionId: "",
      startDateTime: "",
      endDateTime: "",
      isExpired: false,
      bus: {},
      driver: {},
      user: {},
      type: pathNameWords[3],
      errors: {},
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeSelectorHandler = this.onChangeSelectorHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.parseDateToString = this.parseDateToString.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllUsers();
    this.props.getAllAvailableBuses();
    this.props.getAllDriversInservice();
    if (this.state.type === "edit") {
      const { requisitionId } = this.props.match.params;
      this.props.getBusRequisition(requisitionId, this.props.history);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (this.state.type === "edit" && nextProps.busRequsition) {
      const {
        requisitionId,
        startDateTime,
        endDateTime,
        isExpired,
        user,
        bus,
        driver
      } = nextProps.busRequsition;

      this.setState({
        requisitionId,
        startDateTime: this.parseDateToString(startDateTime),
        endDateTime: this.parseDateToString(endDateTime),
        isExpired: (isExpired ? isExpired : false),
        user,
        bus,
        driver
      });
    }
  };

  parseDateToString = dateStr => {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" +
      (date.getMonth() < 10 ? "0" : "") + date.getMonth() + "-" +
      (date.getDate() < 10 ? "0" : "") + date.getDate() + "T" +
      (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" +
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
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
    let tmpDate = new Date(this.state.startDateTime);
    let tmpStartDateTime = tmpDate;
    tmpStartDateTime.setHours(tmpDate.getHours());
    tmpStartDateTime.setMinutes(tmpDate.getMinutes());

    tmpDate = new Date(this.state.endDateTime);
    let tmpEndDateTime = tmpDate;
    tmpEndDateTime.setHours(tmpDate.getHours());
    tmpEndDateTime.setMinutes(tmpDate.getMinutes());

    const newBusRequisition = {
      requisitionId: this.state.requisitionId,
      startDateTime: tmpStartDateTime,
      endDateTime: tmpEndDateTime,
      isExpired: this.state.isExpired,
      user: this.state.user ? this.state.user : {},
      bus: this.state.bus ? this.state.bus : {},
      driver: this.state.driver ? this.state.driver : {}
    };
    this.props.createBusRequisitions(newBusRequisition, this.props.history);
  };

  render() {
    const { users, buses, drivers, errors } = this.props;

    return (
      <Container style={{ padding: "10px" }}>
        <Jumbotron>
          <Form onSubmit={this.onSubmitHandler}>
            <Row>
              <Form.Group className="col-md-4">
                <Form.Label>Stating Date & Time</Form.Label>
                <input
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.startDateTime }
                  )}
                  name="startDateTime"
                  type="datetime-local"
                  value={this.state.startDateTime}
                  onChange={this.onChangeHandler}
                />
                {errors.startDateTime && (
                  <div className="invalid-feedback">
                    {errors.startDateTime}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Finishing Date & Time</Form.Label>
                <input
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.endDateTime }
                  )}
                  name="endDateTime"
                  type="datetime-local"
                  value={this.state.endDateTime}
                  onChange={this.onChangeHandler}
                />
                {errors.endDateTime && (
                  <div className="invalid-feedback">
                    {errors.endDateTime}
                  </div>
                )}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="col-md-6">
                <Form.Label>Requested User</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.user }
                  )}
                  as="select"
                  name="user"
                  value={this.state.user ? this.state.user.userId : ""}
                  onChange={
                    event => this.onChangeSelectorHandler(event, "users", "userId")
                  }
                  style={{ fontSize: "12px" }}
                >
                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >Selete User email</option>
                  {users.map((user, idx) => (
                    <option
                      key={idx}
                      value={user.userId}
                    >
                      {user.email}
                    </option>
                  ))}
                </Form.Control>
                {errors.user && (
                  <div className="invalid-feedback">
                    {errors.user}
                  </div>
                )}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="col-md-6">
                <Form.Label>Bus</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.bus }
                  )}
                  as="select"
                  name="bus"
                  value={this.state.bus ? this.state.bus.busId : ""}
                  onChange={
                    event => this.onChangeSelectorHandler(event, "buses", "busId")
                  }
                  style={{ fontSize: "12px" }}
                >

                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >Selete Bus</option>
                  {buses.map((bus, idx) => (
                    <option
                      key={idx}
                      value={bus.busId}
                    >
                      {bus.number}
                    </option>
                  ))}
                </Form.Control>
                {errors.bus && (
                  <div className="invalid-feedback">
                    {errors.bus}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Driver</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.driver }
                  )}
                  as="select"
                  name="driver"
                  value={this.state.driver ? this.state.driver.driverId : ""}
                  onChange={
                    event => this.onChangeSelectorHandler(event, "drivers", "driverId")
                  }
                  style={{ fontSize: "12px" }}
                >

                  <option
                    value={{}}
                    style={{ fontSize: "12px" }}
                  >Selete Driver</option>
                  {drivers.map((driver, idx) => (
                    <option
                      key={idx}
                      value={driver.driverId}
                    >
                      {driver.user.email}
                    </option>
                  ))}
                </Form.Control>
                {errors.driver && (
                  <div className="invalid-feedback">
                    {errors.driver}
                  </div>
                )}
              </Form.Group>
            </Row>
            {this.state.type === "edit" && (
              <Row>
                <Form.Group className="col-md-4">
                  <Form.Label>Is Expired</Form.Label>
                  <Form.Control
                    as="select"
                    name="isExpired"
                    value={this.state.isExpired}
                    onChange={this.onChangeHandler}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </Form.Control>
                </Form.Group>
              </Row>
            )}
            <Row>
              <br />
            </Row>
            <Row>
              <Form.Group className="col-md-2">
                <Button
                  type="submit"
                  variant="primary"
                >Submit</Button>
              </Form.Group>
            </Row>
          </Form>
        </Jumbotron>
      </Container>
    )
  }
}

CreateBusRequisition.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  getAllAvailableBuses: PropTypes.func.isRequired,
  getAllDriversInservice: PropTypes.func.isRequired,
  createBusRequisitions: PropTypes.func.isRequired,
  getBusRequisition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users,
  buses: state.bus.availableBuses,
  drivers: state.driver.drivers,
  busRequsition: state.bus.busRequsition,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getAllUsers,
    getAllAvailableBuses,
    getAllDriversInservice,
    createBusRequisitions,
    getBusRequisition
  }
)(CreateBusRequisition);
