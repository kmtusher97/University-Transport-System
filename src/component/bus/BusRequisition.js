import React, { Component } from 'react'
import { Container, Row, Table, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBusRequisitions } from '../../actions/BusActions';
import BusRequisitionTopBar from './BusRequisitionTopBar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const busRequsitionExpired = {
  backgroundColor: "#ebc6c6"
};

class BusRequisition extends Component {
  constructor() {
    super();
    let tmpPageNo = 1;
    const pathWords = window.location.pathname.split("/");
    if (pathWords.length === 5) {
      tmpPageNo = parseInt(pathWords[4]);
    }
    this.state = {
      pageNo: tmpPageNo
    };
  }

  componentDidMount = () => {
    this.props.getAllBusRequisitions();
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { busRequsitions } = this.props;

    return (
      <Container style={{ padding: "5px" }}>
        <Row>
          <BusRequisitionTopBar
            data={{
              pageNo: this.state.pageNo,
              pageCount: parseInt(busRequsitions.length / rowsPerPage) +
                (busRequsitions.length % rowsPerPage > 0 ? 1 : 0)
            }}
          />
        </Row>
        <Container
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            height: "1290px",
            overflow: "auto"
          }}
        >
          <Table size="sm" bordered hover striped>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>SL</th>
                <th>Starting Date & Time</th>
                <th>Finishing Date & Time</th>
                <th>Bus</th>
                <th>Driver</th>
                <th>User</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {busRequsitions.map((busRequsition, idx) => (
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) && (
                  <tr
                    key={idx}
                    style={busRequsition.isExpired === true ? busRequsitionExpired : null}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      <Col style={{ padding: "0px", fontSize: "11px" }}>
                        <div>{(new Date(busRequsition.startDateTime).toDateString())}</div>
                        <div>{(new Date(busRequsition.startDateTime).toLocaleTimeString())}</div>
                      </Col>
                    </td>
                    <td>
                      <Col style={{ padding: "0px", fontSize: "11px" }}>
                        <div>{(new Date(busRequsition.endDateTime).toDateString())}</div>
                        <div>{(new Date(busRequsition.endDateTime).toLocaleTimeString())}</div>
                      </Col>
                    </td>
                    <td>
                      <Col style={{ padding: "0px", fontSize: "11px" }}>
                        <div>{"ID: " + busRequsition.bus.busId}</div>
                        <div>{"Number: " + busRequsition.bus.number}</div>
                      </Col>
                    </td>
                    <td>
                      <Col style={{ padding: "0px", fontSize: "11px" }}>
                        <div>{"Name: " + busRequsition.driver.user.firstName + ' ' + busRequsition.driver.user.lastName}</div>
                        <div>{"Email: " + busRequsition.driver.user.email}</div>
                        <div>{"Mobile: " + busRequsition.driver.user.mobileNo}</div>
                      </Col>
                    </td>
                    <td>
                      <Col style={{ padding: "0px", fontSize: "11px" }}>
                        <div>{"Name: " + busRequsition.user.firstName + ' ' + busRequsition.user.lastName}</div>
                        <div>{"Email: " + busRequsition.user.email}</div>
                        <div>{"Mobile: " + busRequsition.user.mobileNo}</div>
                      </Col>
                    </td>
                    <td>
                      <Link to={`/bus/requisition/edit/${busRequsition.requisitionId}`}>
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
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        </Container>

      </Container>
    )
  }
}

BusRequisition.propTypes = {
  getAllBusRequisitions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  busRequsitions: state.bus.busRequsitions
});

export default connect(
  mapStateToProps,
  { getAllBusRequisitions }
)(BusRequisition);
