import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class ShowRoute extends Component {
  constructor() {
    super();
    this.showRoute = this.showRoute.bind(this);
  }

  showRoute = stoppageList => {
    let routeString = "", sz = stoppageList.length;
    routeString = "(";
    for (let i = 0; i < sz; i++) {
      routeString += stoppageList[i].stoppageName;
      if (i + 1 < sz) routeString += ',';
      else routeString += ')';
    }
    return routeString;
  };

  render() {
    return (
      <Col style={{ padding: "0px" }}>
        <div>{"RouteNo: " + (this.props.route ? this.props.route.routeId : "")}</div>
        <div style={{ fontSize: "10px", paddingLeft: "0px", paddingRight: "0px" }}>
          {this.props.route && this.showRoute(this.props.route.routeDetail)}
        </div>
      </Col>
    )
  }
}
