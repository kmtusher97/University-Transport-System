import React, { Component } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStoppage } from "../../actions/StoppageActions";

import classnames from "classnames";

class AddStoppage extends Component {
  constructor() {
    super();
    const pathNameComponents = window.location.pathname.split("/");
    this.state = {
      stoppage: {
        stoppageId: "",
        stoppageName: "",
        latitude: "",
        longitude: ""
      },
      errors: {},
      formType: pathNameComponents[2]
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
    let tmpStoppage = this.state.stoppage;
    tmpStoppage[event.target.name] = event.target.value;
    this.setState({
      stoppage: tmpStoppage
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const newStoppage = {
      stoppageId: this.state.stoppage.stoppageId,
      stoppageName: this.state.stoppage.stoppageName,
      latitude: this.state.stoppage.latitude,
      longitude: this.state.stoppage.longitude
    };
    this.props.addStoppage(newStoppage, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ padding: "5px" }}>
        <Form onSubmit={this.onSubmitHandler}>
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
                <input
                  className={classnames(
                    "form-control from-control-lg",
                    { "is-invalid": errors.stoppageName }
                  )}
                  name="stoppageName"
                  type="text"
                  value={this.state.stoppage.stoppageName}
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
                  value={this.state.stoppage.latitude}
                  onChange={this.onChangeHandler}
                />
                {errors.stoppageName && (
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
                  value={this.state.stoppage.longitude}
                  onChange={this.onChangeHandler}
                />
                {errors.stoppageName && (
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