import React, { Component } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class BusReportItem extends Component {
  render() {
    return (
      <div style={{ paddingBottom: '10px' }}>
        <Card border='warning' style={{ fontSize: '13px' }}>
          <Card.Header>
            <Row>
              <Col md={9}>
                <Card.Text>
                  <strong>{'From: '}</strong>
                  {this.props.busReport.driver.fullName +
                    ' (ID: ' + this.props.busReport.driver.driverId + ')'}
                  <br />
                  <strong>{'Email: '}</strong>
                  {this.props.busReport.driver.email}
                </Card.Text>
              </Col>
              <Col md={3}>
                <Card.Text>
                  <strong>{'Date: '}</strong>
                  {(new Date(this.props.busReport.date)).toDateString()}
                </Card.Text>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {this.props.busReport.report.split('/').map((para, idx) => (
              <Card.Text key={idx}>{para}</Card.Text>
            ))}
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={9}></Col>
              <Col md={2}>
                <Button
                  size='sm'
                  variant='outline-success'
                  onClick={() => this.props.markBusReportAsSolved(
                    this.props.busId,
                    this.props.busReport.busReportId
                  )}
                >
                  Mark as Solved
                </Button>
              </Col>
              <Col md={1}>
                <Button
                  size='sm'
                  variant='outline-danger'
                  onClick={() => this.props.deleteBusReportHandler(
                    this.props.busId,
                    this.props.busReport.busReportId
                  )}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Col>
            </Row>

          </Card.Footer>
        </Card>
      </div>
    )
  }
}

export default BusReportItem;