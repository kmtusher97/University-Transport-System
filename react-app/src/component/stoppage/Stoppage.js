import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap';
import StoppageTopMenubar from './StoppageTopMenubar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { connect } from "react-redux";
import { getAllStoppages, deleteStoppage } from "../../actions/StoppageActions";
import PropTypes from "prop-types";

class Stoppage extends Component {
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
    this.deletestoppageById = this.deletestoppageById.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllStoppages();
  };

  deletestoppageById = stoppageId => {
    this.props.deleteStoppage(stoppageId, this.props.history);
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { stoppage } = this.props;

    return (
      <Row>
        <StoppageTopMenubar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(stoppage.stoppages.length / rowsPerPage) +
              (stoppage.stoppages.length % rowsPerPage > 0 ? 1 : 0)
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
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {stoppage.stoppages.map((stoppage, idx) => (
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{stoppage.stoppageName}</td>
                    <td>{stoppage.latitude}</td>
                    <td>{stoppage.longitude}</td>
                    <td>
                      <Link to={`/stoppage/edit/${stoppage.stoppageId}`}>
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
                        onClick={() => this.deletestoppageById(stoppage.stoppageId)}
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
    )
  }
}

Stoppage.propTypes = {
  stoppage: PropTypes.object.isRequired,
  getAllStoppages: PropTypes.func.isRequired,
  deleteStoppage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ stoppage: state.stoppage });

export default connect(mapStateToProps, {
  getAllStoppages, deleteStoppage
})(Stoppage);