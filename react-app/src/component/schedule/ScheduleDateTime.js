import React, { Component } from 'react'
import { Col } from 'react-bootstrap';

class ScheduleDateTime extends Component {
  render() {
    return (
      <Col style={{ padding: "0px", fontSize: "11px" }}>
        <div>{new Date(this.props.date).toDateString()}</div>
        <div>{new Date(this.props.date).toLocaleTimeString()}</div>
      </Col>
    )
  }
}

export default ScheduleDateTime;