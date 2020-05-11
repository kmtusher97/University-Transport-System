import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAll } from '../../actions/AnnouncementActions';
import { Container, Jumbotron } from 'react-bootstrap';

class Notice extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  componentDidMount = () => {
    this.props.getAll();
  };

  delete = announcementId => { };

  render() {
    return (
      <Container style={{ padding: "10px" }}>
        <Jumbotron style={{ height: "500px", overflow: "auto" }}>

        </Jumbotron>
      </Container>
    )
  }
}

Notice.propType = {
  getAll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  announcement: state.announcement
});

export default connect(
  mapStateToProps,
  { getAll }
)(Notice);