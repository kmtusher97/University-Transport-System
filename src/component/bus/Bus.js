import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";

import BusTopMenuBar from "./BusTopMenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllBuses, deleteBus } from "../../actions/BusActions";

class Bus extends Component {
  constructor() {
    super();

    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }

    this.state = {
      busList: [],
      pageNo: tmpPageNo
    };
    this.deleteBusHandler = this.deleteBusHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllBuses();
  };

  deleteBusHandler = busId => {
    this.props.deleteBus(busId, this.props.history);
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
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{bus.number}</td>
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
  deleteBus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ bus: state.bus });

export default connect(mapStateToProps, { getAllBuses, deleteBus })(Bus);
