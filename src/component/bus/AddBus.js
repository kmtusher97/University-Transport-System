import React, { Component } from 'react';
import {
  Container,
  Form,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import AppData from '../AppData';
import Axios from 'axios';

class AddBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bus: {
        busId: this.props.location.busId,
        number: "",
        status: "",
        oilTankCapacity: "",
        oilInTank: 0,
        gasCylinderCapacity: "",
        gasInCylinder: 0,
        isAvailable: false
      },
      formType: []
    };
  }

  componentDidMount = () => {
    const pathNameComponents = window.location.pathname.split("/");
    this.setState({
      formType: pathNameComponents[2]
    });

    if (
      this.state.bus.busId !== null &&
      this.state.bus.busId !== undefined
    ) {
      let url = `${AppData.restApiBaseUrl}/bus/GLOBAL/getById/${this.state.bus.busId}`;
      Axios.get(url)
        .then(response => response.data)
        .then(data => {
          if (data !== null) {
            this.setState({
              bus: data
            });
          }
        });
    }
  };

  onChangeHandler = event => {
    let tmpBus = this.state.bus;
    tmpBus[event.target.name] = event.target.value;
    this.setState({
      bus: tmpBus
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.formType === "add") {
      let url = `${AppData.restApiBaseUrl}/bus/add`;
      Axios.post(url, this.state.bus)
        .then(response => response.data)
        .then(data => {
          console.log(data);
          if (data === null || data === undefined) {
            alert("Add Failed!!! Network error or this bus number already exists!!!");
          } else {
            window.location.replace("/bus");
          }
        });
    }
    else if (this.state.formType === "edit") {
      let url = `${AppData.restApiBaseUrl}/bus/update`;
      alert(this.state.bus.isAvailable);
      Axios.post(url, this.state.bus)
        .then(response => response.data)
        .then(data => {
          if (data === null || data === undefined) {
            alert("Edit Failed!!!");
          }
          else {
            window.location.replace("/bus");
          }
        });
    }
    else {
      alert("An Unexpected Error Occured!!!");
    }
  };

  render() {
    return (
      <Container style={{ padding: "5px" }}>
        <Form>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Bus Number</Form.Label>
                <Form.Control
                  name="number"
                  type="text"
                  required
                  value={this.state.bus.number}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Is Available</Form.Label>
                <Form.Control
                  name="isAvailable"
                  as="select"
                  custom
                  value={this.state.bus.isAvailable}
                  onChange={this.onChangeHandler}
                >
                  <option key={1} value="false" >No</option>
                  <option key={2} value="true">Yes</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Oil Tank capacity (Liters)</Form.Label>
                <Form.Control
                  name="oilTankCapacity"
                  type="number"
                  required
                  value={this.state.bus.oilTankCapacity}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Oil In Tank (Liters)</Form.Label>
                <Form.Control
                  name="oilInTank"
                  type="number"
                  required
                  value={this.state.bus.oilInTank}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gas Cylinder capacity (Liters)</Form.Label>
                <Form.Control
                  name="gasCylinderCapacity"
                  type="number"
                  required
                  value={this.state.bus.gasCylinderCapacity}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gas In Cylinder (Liters)</Form.Label>
                <Form.Control
                  name="gasInCylinder"
                  type="number"
                  required
                  value={this.state.bus.gasInCylinder}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button
                type="submit"
                variant="primary"
                onClick={this.onSubmitHandler}
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

export default AddBus;