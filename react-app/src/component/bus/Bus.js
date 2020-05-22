import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";

import BusTopMenuBar from "./BusTopMenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllBuses,
  deleteBus,
  markBusReportAsSolved,
  deleteBusReportFromBus
} from "../../actions/BusActions";
import BusReports from "./BusReports";

const busNotAvailableStyle = {
  backgroundColor: "#ebc6c6"
};

class Bus extends Component {
  constructor() {
    super();
    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }
    this.state = {
      pageNo: tmpPageNo,
      show: false
    };
    this.deleteBusHandler = this.deleteBusHandler.bind(this);
    this.markBusReportAsSolved = this.markBusReportAsSolved.bind(this);
    this.deleteBusReportHandler = this.deleteBusReportHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllBuses();
  };

  deleteBusHandler = busId => {
    this.props.deleteBus(busId, this.props.history);
  };

  markBusReportAsSolved = (busId, busReportId) => {
    this.props.markBusReportAsSolved(busId, busReportId, this.props.history);
  };

  deleteBusReportHandler = (busId, busReportId) => {
    this.props.deleteBusReportFromBus(busId, busReportId, this.props.history);
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { bus } = this.props;

    return (
      <Row>
        <BusTopMenuBar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(bus.buses.length / rowsPerPage) +
              (bus.buses.length % rowsPerPage > 0 ? 1 : 0)
          }}
        />
        <Col md={12} style={{ paddingTop: "10px" }}>
          <Table size="sm" bordered hover striped>
            <thead style={{ textAlign: "center", fontSize: "12px" }}>
              <tr>
                <th>SL</th>
                <th>Number</th>
                <th>Oil Tank Capacity</th>
                <th>Gas Cylinder Capacity</th>
                <th>Is Available</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {bus.buses.map((bus, idx) => (
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                  <tr key={idx} style={bus.isAvailable === false ? busNotAvailableStyle : null}>
                    <td>{idx + 1}</td>
                    <td>
                      <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                          {bus.number}
                        </Col>
                        <Col md={2}>
                          {bus.busReports.length > 0 && (
                            <div>
                              <Button
                                size="sm"
                                variant="danger"
                                style={{ borderRadius: "30px", fontWeight: "800" }}
                                onClick={() => this.setState({ show: true })}
                              >
                                {bus.busReports.length}
                              </Button>
                              <BusReports
                                show={this.state.show}
                                bus={{
                                  busId: bus.busId,
                                  number: bus.number
                                }}
                                busReports={bus.busReports.map(busReport => {
                                  let tmpBusReport = {
                                    busReportId: busReport.busReportId,
                                    date: busReport.date,
                                    report: busReport.report,
                                    driver: {
                                      driverId: busReport.driver.driverId,
                                      fullName: busReport.driver.user.firstName + ' ' + busReport.driver.user.firstName,
                                      email: busReport.driver.user.email
                                    }
                                  };
                                  return tmpBusReport;
                                })}
                                onHideHandler={() => this.setState({ show: false })}
                                markBusReportAsSolved={this.markBusReportAsSolved}
                                deleteBusReportHandler={this.deleteBusReportHandler}
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </td>
                    <td>{bus.oilTankCapacity}</td>
                    <td>{bus.gasCylinderCapacity}</td>
                    <td>{bus.isAvailable === true ? "YES" : "NO"}</td>
                    <td>
                      <Link to={"/bus/edit/" + bus.busId}>
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
                        onClick={() => this.deleteBusHandler(bus.busId)}
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

Bus.protoType = {
  bus: PropTypes.object.isRequired,
  getAllBuses: PropTypes.func.isRequired,
  deleteBus: PropTypes.func.isRequired,
  markBusReportAsSolved: PropTypes.func.isRequired,
  deleteBusReportFromBus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ bus: state.bus });

export default connect(
  mapStateToProps,
  {
    getAllBuses,
    deleteBus,
    markBusReportAsSolved,
    deleteBusReportFromBus
  })(Bus);
