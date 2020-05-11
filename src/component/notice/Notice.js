import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAll, deleteAnnouncement } from '../../actions/AnnouncementActions';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import Announcement from './Announcement';
import { Link } from 'react-router-dom';

class Notice extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  componentDidMount = () => {
    this.props.getAll();
  };

  delete = announcementId => {
    this.props.deleteAnnouncement(announcementId, this.props.history);
  };

  render() {
    const { announcement } = this.props;

    return (
      <Container style={{ padding: "10px" }}>
        <div className='col-md-2' style={{ padding: '10px' }}>
          <Link to={'/notice/add'}>
            <Button
              size='sm'
              variant='primary'
            >Add Notice</Button>
          </Link>
        </div>
        <Jumbotron style={{ height: "500px", overflow: "auto" }}>
          {announcement.announcements.map((announcement, idx) => (
            <Announcement
              key={idx}
              data={announcement}
              delete={this.delete}
            />
          ))}
        </Jumbotron>
      </Container>
    )
  }
}

Notice.propType = {
  getAll: PropTypes.func.isRequired,
  deleteAnnouncement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  announcement: state.announcement
});

export default connect(
  mapStateToProps,
  { getAll, deleteAnnouncement }
)(Notice);