import React, { Component } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStoppage } from "../../actions/StoppageActions";

import classnames from "classnames";

class AddStoppage extends Component {
  constructor() {
    super();
    this.state = {
      stoppageId: "",
      stoppageName: "",
      latitude: "",
      longitude: "",
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const newStoppage = {
      stoppageId: this.state.stoppageId,
      stoppageName: this.state.stoppageName,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    this.props.addStoppage(newStoppage, "add", this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ padding: "5px" }}>
        <Form onSubmit={this.onSubmitHandler}>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <strong>{"Add New Stoppage"}</strong>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Stoppage Name</Form.Label>
                <input
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.stoppageName }
                  )}
                  name="stoppageName"
                  type="text"
                  value={this.state.stoppageName}
                  onChange={this.onChangeHandler}
                />
                {errors.stoppageName && (
                  <div className="invalid-feedback">
                    {errors.stoppageName}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <input
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.latitude }
                  )}
                  name="latitude"
                  type="text"
                  value={this.state.latitude}
                  onChange={this.onChangeHandler}
                />
                {errors.latitude && (
                  <div className="invalid-feedback">
                    {errors.latitude}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <input
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.longitude }
                  )}
                  name="longitude"
                  type="text"
                  value={this.state.longitude}
                  onChange={this.onChangeHandler}
                />
                {errors.longitude && (
                  <div className="invalid-feedback">
                    {errors.longitude}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <Button
                size="sm"
                type="submit"
                variant="primary"
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

AddStoppage.propTypes = {
  addStoppage: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ errors: state.errors });

export default connect(mapStateToProps, { addStoppage })(AddStoppage);