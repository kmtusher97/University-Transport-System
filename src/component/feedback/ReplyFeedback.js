import React, { Component } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

class ReplyFeedback extends Component {
  constructor() {
    super();
    this.state = {
      notification: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.sendFeedbackReply(this.state.notification, this.props.user);
    this.props.onHideHandler(event);
  };

  render() {
    return (
      <Modal
        size='lg'
        centered
        show={this.props.show}
        onHide={this.props.onHideHandler}

      >
        <Form onSubmit={this.onSubmitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Reply Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row style={{ padding: '5px' }}>
              <Col md={9}>
                <Form.Text>
                  <strong>{'To: '}</strong>{
                    this.props.user.email
                  }
                </Form.Text>
              </Col>
              <Col md={3}>
                <Form.Text>
                  <strong>{'Date: '}</strong>
                  {(new Date(this.props.date).toDateString())}
                </Form.Text>
              </Col>
            </Row>
            <Form.Group>
              <textarea
                className='form-control from-control-lg'
                name='notification'
                style={{ height: '150px', fontSize: '12px' }}
                value={this.state.notification}
                onChange={this.onChangeHandler}
                required
              >
              </textarea>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size='sm'
              variant='primary'
              type='submit'
            >Send</Button>

            <Button
              size='sm'
              variant='danger'
              onClick={this.props.onHideHandler}
            >Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default ReplyFeedback;
