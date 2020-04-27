import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap';
import StoppageTopMenubar from './StoppageTopMenubar';
import Axios from 'axios';
import AppData from "../AppData";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

class Stoppage extends Component {
  constructor() {
    super();
    let tmpPageNo = 1;
    const pathNameComponents = window.location.pathname.split("/");
    if (pathNameComponents.length === 4) {
      tmpPageNo = parseInt(pathNameComponents[3]);
    }

    this.state = {
      stoppageList: [],
      pageNo: tmpPageNo
    };
  }

  componentDidMount = () => {
    let url = `${AppData.restApiBaseUrl}/stoppage/GLOBAL/getAll`;
    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({
          stoppageList: data
        });
      });
  };

  deletestoppage = stoppageId => {
    let url = `${AppData.restApiBaseUrl}/stoppage/delete/${stoppageId}`;
    Axios.delete(url, null)
      .then(response => response.data)
      .then(data => {
        url = `${AppData.restApiBaseUrl}/stoppage/GLOBAL/getAll`;
        Axios.get(url)
          .then(response => response.data)
          .then(data => {
            this.setState({
              stoppageList: data
            });
          });
      });
  };

  render() {
    const rowsPerPage = 30;
    const upperBound = this.state.pageNo * rowsPerPage;
    const lowerBound = (this.state.pageNo - 1) * rowsPerPage + (this.state.pageNo > 1 ? 1 : 0);

    return (
      <Row>
        <StoppageTopMenubar
          data={{
            pageNo: this.state.pageNo,
            pageCount: parseInt(this.state.stoppageList.length / rowsPerPage) +
              (this.state.stoppageList.length % rowsPerPage > 0 ? 1 : 0)
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
                <th>Stoppage Id</th>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stoppageList.map((stoppage, idx) => (
                (idx + 1 >= lowerBound && idx + 1 <= upperBound) ? (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{stoppage.stoppageId}</td>
                    <td>{stoppage.stoppageName}</td>
                    <td>{stoppage.latitude}</td>
                    <td>{stoppage.longitude}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/stoppage/edit/" + stoppage.stoppageId,
                          stoppageId: stoppage.stoppageId,
                          returnLink: window.location.pathname
                        }}
                      >
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
                        onClick={() => this.deletestoppage(stoppage.stoppageId)}
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

export default Stoppage;