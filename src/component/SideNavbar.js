import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class SideNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathnameComponents: window.location.pathname.split("/")
    };
  }
  render() {
    return (
      <Nav
        defaultActiveKey={"/" + this.state.pathnameComponents[1]}
        variant="pills"
        className="flex-column"
        style={{ padding: "10px" }}
      >
        <Nav.Link href="/schedule">Schedule</Nav.Link>
        <Nav.Link href="/bus" eventKey="/bus">
          Bus
        </Nav.Link>
        <Nav.Link href="/feedback" eventKey="/feedback">
          Feedback
        </Nav.Link>
        <Nav.Link href="/notice" eventKey="/notice">
          Notice
        </Nav.Link>
      </Nav>
    );
  }
}

export default SideNavbar;
