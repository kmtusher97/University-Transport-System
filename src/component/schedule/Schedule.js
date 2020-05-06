import React, { Component } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import ScheduleTopMenuBar from "./ScheduleTopMenuBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusRoutes } from "../../actions/BusRouteActions";
import { getAllSchedules, deleteSchedule } from "../../actions/ScheduleActions";

class Schedule extends Component {
  constructor() {
    super();
    const pathNameComponents = window.location.pathname.split("/");
    let tmpPageNo = 1;
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }

    this.state = {
      pageNo: tmpPageNo
    };

    this.showDate = this.showDate.bind(this);
    this.showRoute = this.showRoute.bind(this);
    this.deleteScheduleHandler = this.deleteScheduleHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllSchedules();
    this.props.getBusRoutes();
  };

  showDate = dateToParse => {
    let date = new Date(dateToParse);
    let dateString = date.toDateString();
    return dateString;
  };

  showRoute = route => {
    if (route === undefined) return "";
    let stoppageList = route.routeDetail;
    let routeString = "", sz = stoppageList.length;
    routeString = "(" + stoppageList[0].stoppageName + ", ....," + stoppageList[sz - 1].stoppageName + ")";
    return routeString;
  };

  deleteScheduleHandler = scheduleId => {
    this.props.deleteSchedule(scheduleId, this.props.history);
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { schedule, busRoute } = this.props;

    return (
      <div>
        <ScheduleTopMenuBar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(schedule.schedules.length / rowsPerPage) +
              (schedule.schedules.length % rowsPerPage > 0 ? 1 : 0)
          }}
        />
        <Row>
          <Col md={12} ref={this.ref1}>
            <Table size="sm" bordered striped hover>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>SL</th>
                  <th>Date & Time</th>
                  <th>Route</th>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Stuff</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {schedule.schedules.map((schedule, idx) => (
                  (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                    <tr key={idx}>
                      <td style={{ textAlign: "center" }}>
                        {(this.state.pageNo - 1) * 30 + idx + 1}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {this.showDate(schedule.date)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {"RouteNo: " + schedule.route.routeId + " "
                          + this.showRoute(
                            busRoute.routes.find(
                              route => route.routeId === schedule.route.routeId
                            )
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {"BusId: " + schedule.bus.busId + ", Number: " + schedule.bus.number}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {"DriverId: " + schedule.driver.driverId + ", Name: " +
                          schedule.driver.user.firstName + " " + schedule.driver.user.lastName}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {schedule.stuff ?
                          ("StuffId: " + schedule.stuff.stuffId + ", Name: " +
                            schedule.stuff.user.firstName + " " + schedule.stuff.user.lastName) : null
                        }
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Link to={`/schedule/edit/${schedule.scheduleId}`} >
                          <Button size="sm" variant="outline-success">
                            <FontAwesomeIcon icon={faPen} />
                          </Button>
                        </Link>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => this.deleteScheduleHandler(schedule.scheduleId)}
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
      </div>
    );
  }
}

Schedule.propTypes = {
  schedule: PropTypes.object.isRequired,
  busRoute: PropTypes.object.isRequired,
  getAllSchedules: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  getBusRoutes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  busRoute: state.busRoute
});

export default connect(
  mapStateToProps, {
  getAllSchedules,
  deleteSchedule,
  getBusRoutes
}
)(Schedule);