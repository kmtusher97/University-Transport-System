import React, { Component } from "react";
import { Table, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BusRouteTopMenuBar from "./BusRouteTopMenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusRoutes, deleteBusRoute } from "../../actions/BusRouteActions";

class BusRoute extends Component {
  constructor() {
    super();

    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }

    this.state = {
      pageNo: tmpPageNo
    };
    this.showRoute = this.showRoute.bind(this);
    this.deleteRouteHandler = this.deleteRouteHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getBusRoutes();
  };

  showRoute = stoppageList => {
    let routeString = "";
    for (let i = 0, sz = stoppageList.length; i < sz; i++) {
      let stoppage = stoppageList[i];
      routeString = routeString.concat(stoppage.stoppageName);
      if (i + 1 < sz) routeString = routeString.concat(", ");
    }
    return routeString;
  };

  deleteRouteHandler = routeId => {
    this.props.deleteBusRoute(routeId, this.props.history);
  };

  render() {
    const rowsPerPage = 20;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { busRoute } = this.props;

    return (
      <Row>
        <BusRouteTopMenuBar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(busRoute.routes.length / rowsPerPage) +
              (busRoute.routes.length % rowsPerPage > 0 ? 1 : 0)
          }}
        />
        <Col md={12} style={{ paddingTop: "10px" }}>
          <Table
            size="sm"
            bordered
            hover
            striped
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>SL</th>
                <th>Route No</th>
                <th>Route</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {busRoute.routes.map((route, idx) => (
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{route.routeId}</td>
                    <td style={{ textAlign: "left" }}>
                      {this.showRoute(route.routeDetail)}
                    </td>
                    <td>
                      <Link to={"/route/edit/" + route.routeId}>
                        <Button
                          size="sm"
                          variant="outline-success"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => this.deleteRouteHandler(route.routeId)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}


BusRoute.propTypes = {
  busRoute: PropTypes.object.isRequired,
  getBusRoutes: PropTypes.func.isRequired,
  deleteBusRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ busRoute: state.busRoute });

export default connect(mapStateToProps, { getBusRoutes, deleteBusRoute })(BusRoute);
