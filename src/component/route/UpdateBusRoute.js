import React, { Component } from 'react'
import {
  Container,
  Form,
  Row,
  ButtonGroup,
  Button,
  Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllStoppages } from '../../actions/StoppageActions';
import { getBusRoute, addBusRoute } from '../../actions/BusRouteActions';

class UpdateBusRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: "",
      route: "",
      routeDetail: [],
      stoppageSequence: [],
      seletedStoppage: -1,
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addStoppageInRoute = this.addStoppageInRoute.bind(this);
    this.deleteStoppageFromRoute = this.deleteStoppageFromRoute.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);
  }

  componentDidMount = () => {
    const { routeId } = this.props.match.params;
    this.props.getBusRoute(routeId, this.props.history);
    this.props.getAllStoppages();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      routeId,
      route,
      routeDetail
    } = nextProps.busRoute;

    this.setState({
      routeId,
      route,
      routeDetail,
      stoppageSequence: routeDetail
    });
  };

  onChangeHandler = event => {
    this.setState({ seletedStoppage: event.target.value });
  };

  addStoppageInRoute = (event, stoppages) => {
    event.preventDefault();
    let tmpStoppageSequence = this.state.stoppageSequence;
    stoppages.forEach(stoppage => {
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
    const newBusRoute = {
      routeId: this.state.routeId,
      route: tmpRoute
    };
    this.props.addBusRoute(newBusRoute, this.props.history);
  };


  render() {
    const { stoppage } = this.props;

    return (
      <Container style={{ padding: "5px" }}>
        <Form onSubmit={this.submitFormHandler}>
          <Row style={{ padding: "5px" }}>
            <strong>{"Edit Route"}</strong>
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
                  <option
                    style={{ fontSize: "12px" }}
                    value={-1}
                  >
                    {"Select Stoppage"}
                  </option>
                  {stoppage.stoppages.map((stoppage, idx) => (
                    <option
                      key={idx + 1}
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
                onClick={(event) => this.addStoppageInRoute(event, stoppage.stoppages)}
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
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
    )
  }
}


UpdateBusRoute.propTypes = {
  errors: PropTypes.object.isRequired,
  busRoute: PropTypes.object.isRequired,
  addBusRoute: PropTypes.func.isRequired,
  getBusRoute: PropTypes.func.isRequired,
  getAllStoppages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  stoppage: state.stoppage,
  busRoute: state.busRoute.route
});

export default connect(
  mapStateToProps,
  {
    addBusRoute,
    getBusRoute,
    getAllStoppages
  }
)(UpdateBusRoute);