import React, { Component } from 'react'
import { Modal, Jumbotron } from 'react-bootstrap';
import BusReportItem from './BusReportItem';

class BusReports extends Component {
  render() {
    return (
      <Modal
        size='xl'
        centered
        show={this.props.show}
        onHide={this.props.onHideHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.bus.number + ' Reports'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Jumbotron
            style={{ height: '500px', overflow: 'auto' }}
          >
            {this.props.busReports.sort(
              function (a, b) { return new Date(b.date) - new Date(a.date) }
            ).map((busReport, idx) => (
              <BusReportItem
                key={idx}
                busReport={busReport}
                busId={this.props.bus.busId}
                markBusReportAsSolved={this.props.markBusReportAsSolved}
                deleteBusReportHandler={this.props.deleteBusReportHandler}
              />
            ))}
          </Jumbotron>
        </Modal.Body>
      </Modal>
    )
  }
}

export default BusReports;