import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllDriversInservice, deleteDriver } from '../../actions/DriverActions';
import { Row, Col, Table, Button } from 'react-bootstrap';
import TopBar from './TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Driver extends Component {
  constructor() {
    super();
    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }
    this.state = {
      pageNo: tmpPageNo,
      type: pathNameComponents[1]
    };
    this.deleteDriver = this.deleteDriver.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllDriversInservice();
  };

  deleteDriver = driverId => {
    this.props.deleteDriver(driverId, this.props.history);
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { driver } = this.props;

    return (
      <Row>
        <TopBar
          data={{
            type: this.state.type,
            pageNo: this.state.pageNo,
            pageCount: parseInt(driver.drivers.length / rowsPerPage) +
              (driver.drivers.length % rowsPerPage > 0 ? 1 : 0)
          }}
        />
        <Col md={12}>
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
                <th>Full Name</th>
                <th>Mobile No</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                driver.drivers.map((driver, idx) => (
                  (idx + 1 >= lowerBound && idx + 1 <= upperBound) && (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{driver.user.firstName + " " + driver.user.lastName}</td>
                      <td>{driver.user.mobileNo}</td>
                      <td>{driver.user.email}</td>
                      <td>{driver.rating}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => this.deleteDriver(driver.driverId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  )
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

Driver.propTypes = {
  driver: PropTypes.object.isRequired,
  getAllDriversInservice: PropTypes.func.isRequired,
  deleteDriver: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ driver: state.driver });

export default connect(
  mapStateToProps,
  { getAllDriversInservice, deleteDriver }
)(Driver);
