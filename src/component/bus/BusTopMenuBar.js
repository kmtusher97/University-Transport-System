import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BusTopMenuBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Col md={3} style={{ padding: "5px", paddingLeft: "15px" }}>
          <Link to={"/bus/add"}>
            <Button size="sm" variant="outline-primary">
              Add Bus
            </Button>
          </Link>
        </Col>
      </React.Fragment>

    )
  }
}


export default BusTopMenuBar;