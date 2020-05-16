import React, { Component } from "react";
import { Nav, Button } from "react-bootstrap";
import { logout } from "../actions/SecurityActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faCalendarCheck,
  faBus,
  faBullhorn,
  faHandPaper,
  faUsers,
  faUsersCog,
  faRoute,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

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
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "500"
        }}
      >
        <Nav.Link href="/schedule">
          <FontAwesomeIcon icon={faCalendarCheck} />
          {" Schedule"}
        </Nav.Link>
        <Nav.Link href="/bus">
          <FontAwesomeIcon icon={faBus} />
          {" Bus"}
        </Nav.Link>
        <Nav.Link href="/stoppage">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {" Stoppage"}
        </Nav.Link>
        <Nav.Link href="/route">
          <FontAwesomeIcon icon={faRoute} />
          {" Route"}
        </Nav.Link>
        <Nav.Link href="/driver">
          <FontAwesomeIcon icon={faUsersCog} />
          {" Driver"}
        </Nav.Link>
        <Nav.Link href="/stuff">
          <FontAwesomeIcon icon={faUsers} />
          {" Stuff"}
        </Nav.Link>
        <Nav.Link href="/notice">
          <FontAwesomeIcon icon={faBullhorn} />
          {" Notice"}
        </Nav.Link>
        <Nav.Link href="/feedback">
          <FontAwesomeIcon icon={faHandPaper} />
          {" Feedback"}
        </Nav.Link>
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
