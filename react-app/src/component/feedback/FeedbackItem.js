import React, { Component } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faReply } from "@fortawesome/free-solid-svg-icons";
import ReplyFeedback from './ReplyFeedback';

class FeedbackItem extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.openFeedbackReplyForm = this.openFeedbackReplyForm.bind(this);
    this.onHideHandler = this.onHideHandler.bind(this);
  }

  openFeedbackReplyForm = event => {
    this.setState({ show: true });
  };

  onHideHandler = event => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Container style={{ paddingBottom: '10px' }}>
        <Card border='warning'>
          <Card.Header>
            <Row>
              <Col md={9}>
                <Card.Subtitle style={{ marginBottom: '5px' }}>
                  {'User Name: ' + this.props.data.user.firstName + ' ' + this.props.data.user.lastName}
                </Card.Subtitle>
                <Card.Text>
                  {'User Email: ' + this.props.data.user.email}
                </Card.Text>
              </Col>
              <Col md={3}>
                <Card.Subtitle>{'Date: ' + new Date(this.props.data.date).toDateString()}</Card.Subtitle>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {this.props.data.description.split('\n').map((para, idx) => (
              <Card.Text key={idx}>{para}</Card.Text>
            ))}
          </Card.Body>
          <Card.Footer>
            <div className='col-md-1' style={{ float: 'right' }}>
              <Button
                size='sm'
                variant='outline-danger'
                onClick={() => this.props.deleteFeedback(this.props.data.feedbackId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
            <div className='col-md-1' style={{ float: 'right' }}>
              <Button
                size='sm'
                variant='outline-info'
                onClick={this.openFeedbackReplyForm}
              >
                <FontAwesomeIcon icon={faReply} />
              </Button>
              <ReplyFeedback
                show={this.state.show}
                user={this.props.data.user}
                date={this.props.data.date}
                onHideHandler={this.onHideHandler}
                sendFeedbackReply={this.props.sendFeedbackReply}
              />
            </div>
          </Card.Footer>
        </Card>
      </Container>
    )
  }
}

export default FeedbackItem;