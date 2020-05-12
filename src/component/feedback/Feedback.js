import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllFeedbacks, deleteFeedback, replyFeedback } from '../../actions/FeedbackActions';
import { Container, Jumbotron } from 'react-bootstrap';
import FeedbackItem from './FeedbackItem';

class Feedback extends Component {
  constructor() {
    super();
    this.deleteFeedback = this.deleteFeedback.bind(this);
    this.sendFeedbackReply = this.sendFeedbackReply.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllFeedbacks();
  };

  deleteFeedback = feedbackId => {
    this.props.deleteFeedback(feedbackId, this.props.history);
  };

  sendFeedbackReply = (replyMessage, user) => {
    const newNotification = {
      date: (new Date()).toISOString(),
      notification: replyMessage,
      user: user
    };
    this.props.replyFeedback(newNotification);
  };

  render() {
    const { feedback } = this.props;

    return (
      <Container style={{ padding: "10px" }}>
        <Jumbotron style={{ height: "1250px", overflow: "auto" }}>
          {feedback.feedbacks.map((feedback, idx) => (
            <FeedbackItem
              key={idx}
              data={feedback}
              deleteFeedback={this.deleteFeedback}
              sendFeedbackReply={this.sendFeedbackReply}
            />
          ))}
        </Jumbotron>
      </Container>
    )
  }
}

Feedback.propType = {
  feedback: PropTypes.func.isRequired,
  getAllFeedbacks: PropTypes.func.isRequired,
  deleteFeedback: PropTypes.func.isRequired,
  replyFeedback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  feedback: state.feedback
});

export default connect(
  mapStateToProps,
  {
    getAllFeedbacks,
    deleteFeedback,
    replyFeedback
  }
)(Feedback);