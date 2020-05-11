import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllStuffsInservice } from '../../actions/StuffActions';
import { Row, Col, Table, Button } from 'react-bootstrap';
import TopBar from './TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Stuff extends Component {
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
  }

  componentDidMount = () => {
    this.props.getAllStuffsInservice();
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);
    const { stuff } = this.props;

    return (
      <Row>
        <TopBar
          data={{
            type: this.state.type,
            pageNo: this.state.pageNo,
            pageCount: parseInt(stuff.stuffs.length / rowsPerPage) +
              (stuff.stuffs.length % rowsPerPage > 0 ? 1 : 0)
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
                stuff.stuffs.map((stuff, idx) => (
                  (idx + 1 >= lowerBound && idx + 1 <= upperBound) && (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{stuff.user.firstName + " " + stuff.user.lastName}</td>
                      <td>{stuff.user.mobileNo}</td>
                      <td>{stuff.user.email}</td>
                      <td>{stuff.rating}</td>
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
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

Stuff.propTypes = {
  stuff: PropTypes.object.isRequired,
  getAllStuffsInservice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ stuff: state.stuff });

export default connect(
  mapStateToProps,
  { getAllStuffsInservice }
)(Stuff);
