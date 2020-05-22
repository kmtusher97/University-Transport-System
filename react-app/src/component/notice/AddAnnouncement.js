import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create } from '../../actions/AnnouncementActions';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';
import classnames from 'classnames';

class AddAnnouncement extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      announcement: '',
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillReceiveProps = nexprops => {
    if (nexprops.errors) {
      this.setState({ errors: nexprops.errors });
    }
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const newAnnouncement = {
      date: this.state.date,
      announcement: this.state.announcement
    };
    this.props.create(newAnnouncement, this.props.history);
  };

  render() {
    const { errors } = this.props

    return (
      <Container style={{ padding: '10px' }}>
        <Jumbotron>
          <Form onSubmit={this.onSubmitHandler}>
            <Form.Group className='col-md-4'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                className={classnames(
                  'form-control from-control-lg',
                  { 'is-invalid': errors.date }
                )}
                name='date'
                type='date'
                value={this.state.date}
                onChange={this.onChangeHandler}
              />
              {errors.date && (
                <div className='invalid-feedback'>
                  {errors.date}
                </div>
              )}
            </Form.Group>

            <Form.Group className='col-md-12'>
              <Form.Label>Announcement</Form.Label>
              <textarea
                className={classnames(
                  'form-control from-control-lg',
                  { 'is-invalid': errors.announcement }
                )}
                name='announcement'
                type='textArea'
                value={this.state.announcement}
                onChange={this.onChangeHandler}
                style={{ height: '200px', fontSize: '12px' }}
              ></textarea>
              {errors.announcement && (
                <div className='invalid-feedback'>
                  {errors.announcement}
                </div>
              )}
            </Form.Group>
            <Form.Group className='col-md-2'>
              <Button
                size='sm'
                variant='primary'
                type='submit'
              >Submit</Button>
            </Form.Group>
          </Form>
        </Jumbotron>
      </Container>
    )
  }
}

AddAnnouncement.propType = {
  create: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { create }
)(AddAnnouncement);