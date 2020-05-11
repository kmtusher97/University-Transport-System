import React, { Component } from 'react'
import { Card, Container, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Announcement extends Component {
  render() {
    return (
      <Container style={{ paddingBottom: '10px' }}>
        <Card>
          <Card.Header>
            <Card.Title>
              {'Date: ' + (new Date(this.props.data.date)).toLocaleDateString()}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {this.props.data.announcement.split('\n').map((paragraph, i) => (
              <Card.Text key={i}>
                {paragraph}
              </Card.Text>
            ))}
          </Card.Body>
          <Card.Footer>
            <div className='col-md-1' style={{ float: 'right' }}>
              <Button
                size='sm'
                variant='outline-danger'
                onClick={() => this.props.delete(this.props.data.announcementId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    )
  }
}

export default Announcement;
