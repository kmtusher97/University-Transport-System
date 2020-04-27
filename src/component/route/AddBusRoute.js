import React, { Component } from 'react'
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import Axios from 'axios';
import AppData from '../AppData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class AddBusRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stoppageList: [],
      route: {
        routeId: this.props.location.routeId,
        route: "",
        routeDetail: []
      },
      stoppageSequence: [],
      seletedStoppage: 0,
      formType: ""
    };
  }

  componentDidMount = () => {
    const pathNameComponents = window.location.pathname.split("/");
    this.setState({
      formType: pathNameComponents[2]
    });

    let url = `${AppData.restApiBaseUrl}/stoppage/GLOBAL/getAll`;
    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({
          stoppageList: data
        });

        if (this.state.stoppageList.length > 0) {
          this.setState({
            seletedStoppage: this.state.stoppageList[0].stoppageId
          });
        }

        if (
          this.state.route.routeId !== null &&
          this.state.route.routeId !== undefined
        ) {
          let url1 = `${AppData.restApiBaseUrl}/route/GLOBAL/get/${this.state.route.routeId}`;
          Axios.get(url1)
            .then(response => response.data)
            .then(data => {
              if (data !== null) {
                let tmpRoute = data.route.split(",");
                let tmpStoppageSequence = [];
                tmpRoute.forEach(stoppageId => {
                  this.state.stoppageList.forEach(stoppage => {
                    if (stoppage.stoppageId === parseInt(stoppageId)) {
                      tmpStoppageSequence.push(stoppage);
                    }
                  });
                });

                this.setState({
                  route: data,
                  stoppageSequence: tmpStoppageSequence
                });
              }
            });
        }
      });
  };

  onChangeHandler = event => {
    this.setState({
      seletedStoppage: event.target.value
    });
  };

  addStoppageInRoute = event => {
    event.preventDefault();
    let tmpStoppageSequence = this.state.stoppageSequence;
    this.state.stoppageList.forEach(stoppage => {
      if (stoppage.stoppageId === parseInt(this.state.seletedStoppage)) {
        tmpStoppageSequence.push(stoppage);
      }
    });
    this.setState({
      stoppageSequence: tmpStoppageSequence
    });
  }

  deleteStoppageFromRoute = (event, idx) => {
    event.preventDefault();
    let tmpStoppageSequence = [];
    let sz = this.state.stoppageSequence.length;
    for (let i = 0; i < sz; i++) {
      if (i !== idx) {
        tmpStoppageSequence.push(
          this.state.stoppageSequence[i]
        );
      }
    }
    this.setState({
      stoppageSequence: tmpStoppageSequence
    });
  };

  submitFormHandler = event => {
    event.preventDefault();
    let tmpRoute = "";
    let sz = this.state.stoppageSequence.length;
    for (let i = 0; i < sz; i++) {
      tmpRoute += this.state.stoppageSequence[i].stoppageId;
      if (i !== sz - 1) {
        tmpRoute += ",";
      }
    }
    let newRoute = this.state.route;
    newRoute.route = tmpRoute;
    this.setState({
      route: newRoute
    });
    let url = "";
    if (this.state.formType === "add") {
      url = `${AppData.restApiBaseUrl}/route/add`;
    }
    else if (this.state.formType === "edit") {
      url = `${AppData.restApiBaseUrl}/route/update`;
    }
    else {
      alert("An Unexpected Error Occured!!!");
      return;
    }
    Axios.post(url, this.state.route)
      .then(response => response.data)
      .then(data => {
        if (data === null || data === undefined) {
          alert("Process Failed!!!");
        }
        else {
          window.location.replace(this.props.location.returnLink);
        }
      });
  };

  render() {
    return (
      <Container style={{ padding: "5px" }}>
        <Form>
          <Row style={{ padding: "5px" }}>
            <strong>
              {(this.state.formType === "add")
                ? "Add New Route"
                : ("Edit Route " + this.state.route.routeId)}
            </strong>
          </Row>
          <Row style={{ padding: "5px" }}>
            {this.state.stoppageSequence.map((stoppage, idx) => (
              <ButtonGroup
                size="sm"
                key={idx}
                style={{ padding: "5px" }}
              >
                <Button
                  size="sm"
                  variant="outline-dark"
                  disabled
                >
                  <strong>{stoppage.stoppageName}</strong>
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={event => this.deleteStoppageFromRoute(event, idx)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </ButtonGroup>
            ))}
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col md={7}></Col>
            <Col md={3}>
              <Form.Group>
                <Form.Control
                  as="select"
                  custom
                  style={{ fontSize: "12px" }}
                  onChange={this.onChangeHandler}
                >
                  {this.state.stoppageList.map((stoppage, idx) => (
                    <option
                      key={idx}
                      value={stoppage.stoppageId}
                      style={{ fontSize: "12px" }}
                    >
                      {stoppage.stoppageName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                size="sm"
                variant="outline-success"
                onClick={this.addStoppageInRoute}
              >
                Add Stoppage
              </Button>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Button
              type="submit"
              size="sm"
              variant="primary"
              onClick={this.submitFormHandler}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default AddBusRoute;