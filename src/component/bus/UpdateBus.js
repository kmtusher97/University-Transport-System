import React, { Component } from 'react'
import { Container, Form, Col, Button, Row } from 'react-bootstrap';
import classnames from "classnames";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getBus, addBus } from "../../actions/BusActions"


class UpdateBus extends Component {
  constructor() {
    super();
    this.state = {
      busId: "",
      number: "",
      oilTankCapacity: "",
      gasCylinderCapacity: "",
      isAvailable: false,
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }


  componentDidMount = () => {
    const { busId } = this.props.match.params;
    this.props.getBus(busId, this.props.history);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      busId,
      number,
      oilTankCapacity,
      gasCylinderCapacity,
      isAvailable
    } = nextProps.bus;

    this.setState({
      busId,
      number,
      oilTankCapacity,
      gasCylinderCapacity,
      isAvailable
    });
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const editedBus = {
      busId: this.state.busId,
      number: this.state.number,
      oilTankCapacity: this.state.oilTankCapacity,
      gasCylinderCapacity: this.state.gasCylinderCapacity,
      isAvailable: this.state.isAvailable
    };
    this.props.addBus(editedBus, "update", this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ padding: "5px" }}>
        <Form onSubmit={this.onSubmitHandler}>
          <Row style={{ padding: "15px" }}>
            <strong>Edit </strong>
          </Row>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Bus Number</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.number }
                  )}
                  name="number"
                  type="text"
                  value={this.state.number}
                  onChange={this.onChangeHandler}
                />
                {errors.number && (
                  <div className="invalid-feedback">
                    {errors.number}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Is Available</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.isAvailable }
                  )}
                  name="isAvailable"
                  as="select"
                  value={this.state.isAvailable}
                  onChange={this.onChangeHandler}
                >
                  <option key={1} value="false" >No</option>
                  <option key={2} value="true">Yes</option>
                </Form.Control>
                {errors.isAvailable && (
                  <div className="invalid-feedback">
                    {errors.isAvailable}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Oil Tank capacity (Liters)</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.oilTankCapacity }
                  )}
                  name="oilTankCapacity"
                  type="number"
                  value={this.state.oilTankCapacity}
                  onChange={this.onChangeHandler}
                />
                {errors.oilTankCapacity && (
                  <div className="invalid-feedback">
                    {errors.oilTankCapacity}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gas Cylinder capacity (Liters)</Form.Label>
                <Form.Control
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.gasCylinderCapacity }
                  )}
                  name="gasCylinderCapacity"
                  type="number"
                  value={this.state.gasCylinderCapacity}
                  onChange={this.onChangeHandler}
                />
                {errors.gasCylinderCapacity && (
                  <div className="invalid-feedback">
                    {errors.gasCylinderCapacity}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </Col>
            <Col md={6}>
              <Button
                type="reset"
                variant="secondary"
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

UpdateBus.propTypes = {
  errors: PropTypes.object.isRequired,
  bus: PropTypes.object.isRequired,
  getBus: PropTypes.func.isRequired,
  addBus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  bus: state.bus.bus
});

export default connect(mapStateToProps, { getBus, addBus })(UpdateBus);