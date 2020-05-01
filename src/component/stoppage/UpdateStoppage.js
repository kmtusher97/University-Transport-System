import React, { Component } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStoppageById, addStoppage } from "../../actions/StoppageActions";
import classnames from "classnames";

class UpdateStoppage extends Component {
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

  componentDidMount = () => {
    const { stoppageId } = this.props.match.params;
    this.props.getStoppageById(stoppageId, this.props.history);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      stoppageId,
      stoppageName,
      latitude,
      longitude
    } = nextProps.stoppage;

    this.setState({
      stoppageId,
      stoppageName,
      latitude,
      longitude
    });

  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const updateStoppage = {
      stoppageId: this.state.stoppageId,
      stoppageName: this.state.stoppageName,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    this.props.addStoppage(updateStoppage, "update", this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ padding: "5px" }}>
        <Form onSubmit={this.onSubmitHandler}>
          <Row style={{ padding: "5px" }}>
            <Col md={12}>
              <strong>{"Edit Stoppage"}</strong>
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

UpdateStoppage.propTypes = {
  errors: PropTypes.object.isRequired,
  stoppage: PropTypes.object.isRequired,
  addStoppage: PropTypes.func.isRequired,
  getStoppageById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  stoppage: state.stoppage.stoppage
});

export default connect(
  mapStateToProps,
  { getStoppageById, addStoppage })(UpdateStoppage);