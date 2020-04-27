import React, { Component } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Axios from 'axios';
import AppData from "../AppData";

class AddStoppage extends Component {
  constructor(props) {
    super(props);
    const pathNameComponents = window.location.pathname.split("/");
    this.state = {
      stoppage: {
        stoppageId: this.props.location.stoppageId,
        stoppageName: "",
        latitude: "",
        longitude: ""
      },
      formType: pathNameComponents[2]
    };
  }

  componentDidMount = () => {
    if (
      this.state.stoppage.stoppageId !== null &&
      this.state.stoppage.stoppageId !== undefined
    ) {
      let url1 = `${AppData.restApiBaseUrl}/stoppage/GLOBAL/get/${this.state.stoppage.stoppageId}`;
      Axios.get(url1)
        .then(response => response.data)
        .then(data => {
          if (data !== null) {
            this.setState({
              stoppage: data
            });
          }
        });
    }
  };

  onChangeHandler = event => {
    let tmpStoppage = this.state.stoppage;
    tmpStoppage[event.target.name] = event.target.value;
    this.setState({
      stoppage: tmpStoppage
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (
      this.state.stoppage.stoppageName === "" ||
      this.state.stoppage.stoppageName === null
    ) {
      alert("Stoppage Name Required!!!");
      return;
    }
    if (
      this.state.stoppage.latitude === "" ||
      this.state.stoppage.latitude === null
    ) {
      alert("Latitude Required!!!");
      return;
    }
    if (
      this.state.stoppage.longitude === "" ||
      this.state.stoppage.longitude === null
    ) {
      alert("Longitude Required!!!");
      return;
    }

    let url = "";
    if (this.state.formType === "add") {
      url = `${AppData.restApiBaseUrl}/stoppage/add`
    }
    else if (this.state.formType === "edit") {
      url = `${AppData.restApiBaseUrl}/stoppage/update`
    }
    else {
      alert("An unexpected error occured!!");
    }
    Axios.post(url, this.state.stoppage)
      .then(response => response.data)
      .then(data => {
        if (data === null || data === undefined) {
          alert("Failed!!!!");
        }
        else {
          window.location.replace(this.props.location.returnLink);
        }
      });
  }

  render() {
    return (
      <Container style={{ padding: "5px" }}>
        <Form>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <strong>
                {(this.state.formType === "add")
                  ? "Add New Route"
                  : ("Edit Route " + this.state.stoppage.stoppageId)}
              </strong>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Stoppage Name</Form.Label>
                <Form.Control
                  name="stoppageName"
                  type="text"
                  required
                  value={this.state.stoppage.stoppageName}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  name="latitude"
                  type="text"
                  required
                  value={this.state.stoppage.latitude}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  name="longitude"
                  type="text"
                  required
                  value={this.state.stoppage.longitude}
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <Button
                size="sm"
                type="submit"
                variant="primary"
                onClick={this.onSubmitHandler}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default AddStoppage;