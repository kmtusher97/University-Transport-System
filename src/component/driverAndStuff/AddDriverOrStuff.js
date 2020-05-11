import React, { Component } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNewDriverOrStuff } from '../../actions/DriverActions';
import classnames from 'classnames';

class AddDriverOrStuff extends Component {
  constructor() {
    super();
    let pathWords = window.location.pathname.split('/');
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobileNo: "",
      type: pathWords[1]
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobileNo: this.state.mobileNo,
      isBlocked: false,
    };
    this.props.addNewDriverOrStuff(newUser, this.state.type, this.props.history);
  };

  render() {
    const { errors } = this.props;

    return (
      <Container style={{ padding: "25px" }}>
        <Form
          onSubmit={this.onSubmitHandler}
          style={{ padding: "20px" }}
        >
          <Form.Group>
            <Form.Control
              className={classnames(
                "form-control from-control-lg",
                { "is-invalid": errors.firstName }
              )}
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.onChangeHandler}
              placeholder="First Name"
            />
            {errors.firstName && (
              <div className="invalid-feedback">
                {errors.firstName}
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={classnames(
                "form-control from-control-lg",
                { "is-invalid": errors.lastName }
              )}
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.onChangeHandler}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <div className="invalid-feedback">
                {errors.lastName}
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={classnames(
                "form-control from-control-lg",
                { "is-invalid": errors.email }
              )}
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              placeholder="@Email"
            />
            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={classnames(
                "form-control from-control-lg",
                { "is-invalid": errors.password }
              )}
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              placeholder="Initial Password"
            />
            {errors.password && (
              <div className="invalid-feedback">
                {errors.password}
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              className={classnames(
                "form-control from-control-lg",
                { "is-invalid": errors.mobileNo }
              )}
              name="mobileNo"
              type="text"
              value={this.state.mobileNo}
              onChange={this.onChangeHandler}
              placeholder="Mobile no"
            />
            {errors.mobileNo && (
              <div className="invalid-feedback">
                {errors.mobileNo}
              </div>
            )}
          </Form.Group>
          <Row>
            <Col md={6}>
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
            <Col md={6}>
              <Button
                variant="secondary"
                type="reset"
                style={{ float: "right" }}
              >Reset</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

AddDriverOrStuff.propTypes = {
  errors: PropTypes.object.isRequired,
  addNewDriverOrStuff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ errors: state.errors });

export default connect(
  mapStateToProps, {
  addNewDriverOrStuff
})(AddDriverOrStuff);