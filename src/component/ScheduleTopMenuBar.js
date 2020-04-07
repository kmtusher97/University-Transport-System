import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class ScheduleTopMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: this.props.data.pageNo,
      pageCount: this.props.data.pageCount
    };
  }

  render() {
    return (
      <Row>
        <Col md={3} style={{ padding: "5px", paddingLeft: "15px" }}>
          <Link to={"/schedule/add"}>
            <Button size="sm" variant="outline-primary">
              Add Schedule
            </Button>
          </Link>
        </Col>
        <Col md={7} style={{ padding: "5px" }}>

        </Col>
        <Col md={2} style={{ padding: "5px", paddingRight: "15px" }}>
          <Link to={{
            pathname: `/schedule/page/${this.state.pageCount + 1}`
          }}>
            <Button
              size="sm"
              variant="info"
              style={{ float: "right" }}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </Col>
      </Row>
    )
  }
}

export default ScheduleTopMenuBar;