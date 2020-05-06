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
import ScheduleDateTime from "./ScheduleDateTime";
import ShowRoute from "./ShowRoute";

const completedScheduleStyle = {
  backgroundColor: "#ebc6c6"
};

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
    this.deleteScheduleHandler = this.deleteScheduleHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllSchedules();
    this.props.getBusRoutes();
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
                    <tr
                      key={idx}
                      style={schedule.isComplete === true ? completedScheduleStyle : null}
                    >
                      <td style={{ textAlign: "center" }}>
                        {(this.state.pageNo - 1) * 30 + idx + 1}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <ScheduleDateTime date={schedule.date} />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <ShowRoute route={
                          busRoute.routes.find(
                            route => route.routeId === schedule.route.routeId
                          )
                        } />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div>{"BusNo: " + schedule.bus.busId}</div>
                        <div style={{ fontSize: "11px" }}>{schedule.bus.number}</div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div>{"DriverId: " + schedule.driver.driverId}</div>
                        <div style={{ fontSize: "11px" }}>{"Name: " + schedule.driver.user.firstName + " " + schedule.driver.user.lastName}</div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {schedule.stuff ?
                          (<div>
                            <div>{"StuffId: " + schedule.stuff.stuffId}</div>
                            <div style={{ fontSize: "11px" }}>{"Name: " + schedule.stuff.user.firstName + " " + schedule.stuff.user.lastName}</div>
                          </div>
                          ) : null
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