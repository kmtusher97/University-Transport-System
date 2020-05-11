import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllFeedbacks, deleteFeedback } from '../../actions/FeedbackActions';
import { Container, Jumbotron } from 'react-bootstrap';
import FeedbackItem from './FeedbackItem';

class Feedback extends Component {
  constructor() {
    super();
    this.deleteFeedback = this.deleteFeedback.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllFeedbacks();
  };

  deleteFeedback = feedbackId => {
    this.props.deleteFeedback(feedbackId, this.props.history);
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
  deleteFeedback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  feedback: state.feedback
});

export default connect(
  mapStateToProps,
  {
    getAllFeedbacks,
    deleteFeedback
  }
)(Feedback);