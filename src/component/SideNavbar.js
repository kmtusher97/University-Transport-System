import React, { Component } from "react";
import { Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions/SecurityActions";
import { connect } from "react-redux";

class SideNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathnameComponents: window.location.pathname.split("/")
    };
    this.processLogout = this.processLogout.bind(this);
  }

  processLogout = event => {
    if (
      window.confirm("Do you want to logout?")
    ) {
      this.props.logout();
      window.location.href = "/";
    }
  };

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
        <Nav.Link href="/notice">Notice</Nav.Link>
        <Nav.Link href="/feedback">Feedback</Nav.Link>
        <br />
        <Button
          size="sm"
          variant="outline-danger"
          onClick={this.processLogout}
        >
          <span>
            <FontAwesomeIcon icon={faPowerOff} />
          </span>
          {"  Logout"}
        </Button>
      </Nav>
    );
  }
}

export default connect(null, { logout })(SideNavbar);
