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
        defaultActiveKey={
          this.state.pathnameComponents[1] === ""
            ? "/schedule"
            : "/" + this.state.pathnameComponents[1]
        }
        variant="pills"
        className="flex-column"
        style={{
          padding: "10px",
          border: "1px solid gray",
          borderRadius: "5px"
        }}
      >
        <Nav.Link href="/schedule">Schedule</Nav.Link>
        <Nav.Link href="/bus">Bus</Nav.Link>
        <Nav.Link href="/stoppage">Stoppage</Nav.Link>
        <Nav.Link href="/route">Route</Nav.Link>
        <Nav.Link href="/driver">Driver</Nav.Link>
        <Nav.Link href="/stuff">Stuff</Nav.Link>
        <Nav.Link href="/feedback">Feedback</Nav.Link>
        <Nav.Link href="/notice">Notice</Nav.Link>
      </Nav>
    );
  }
}

export default SideNavbar;
