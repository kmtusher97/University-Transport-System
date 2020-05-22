import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/**Componnts */
import SideNavbar from './component/SideNavbar';
import Schedule from './component/schedule/Schedule';
import AddSchedule from './component/schedule/AddSchedule';
import UpdateSchedule from './component/schedule/UpdateSchedule';
import Bus from './component/bus/Bus';
import AddBus from './component/bus/AddBus';
import UpdateBus from './component/bus/UpdateBus';
import BusRequisition from './component/bus/BusRequisition';
import CreateBusRequisition from './component/bus/CreateBusRequisition';
import BusRoute from './component/route/BusRoute';
import AddBusRoute from './component/route/AddBusRoute';
import UpdateBusRoute from './component/route/UpdateBusRoute';
import Stoppage from './component/stoppage/Stoppage';
import AddStoppage from './component/stoppage/AddStoppage';
import UpdateStoppage from './component/stoppage/UpdateStoppage';
import Driver from './component/driverAndStuff/Driver';
import Stuff from './component/driverAndStuff/Stuff';
import AddDriverOrStuff from './component/driverAndStuff/AddDriverOrStuff';
import Notice from './component/notice/Notice';
import AddAnnouncement from './component/notice/AddAnnouncement';
import Feedback from './component/feedback/Feedback';
import Login from './component/Login';

/**Redux */
import { Provider } from 'react-redux';
import store from './Store';

import jwt_decode from 'jwt-decode';
import setJWTTokenToHeader from './security/setJWTTokenToHeader';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/SecurityActions';
import SecureRoute from './security/SecureRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusAlt } from '@fortawesome/free-solid-svg-icons';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTTokenToHeader(jwtToken);
  const decodeJwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodeJwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decodeJwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

const MainDivStyle = {
  border: "1px solid gray",
  borderRadius: "5px",
  height: "1350px"
};

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div
            className="App"
            style={{
              paddingTop: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "10px"
            }}
          >
            {
              jwtToken && (
                <Row style={{ height: "50px" }}>
                  <Col md={6}>
                    <h2>
                      <FontAwesomeIcon icon={faBusAlt} />
                      {" | University Bus System"}
                    </h2>
                  </Col>
                  <Col md={6}></Col>
                </Row>
              )
            }
            <Row>
              {
                jwtToken &&
                (<Col md={2}>
                  <SideNavbar />
                </Col>)
              }
              <Col
                md={jwtToken ? 10 : 12}
                style={
                  jwtToken ? MainDivStyle : null
                }
              >
                <div role="main">
                  {
                    // public routes
                  }
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  {
                    // routes for schedule
                  }
                  <Switch>
                    <SecureRoute exact path="/schedule" component={Schedule} />
                    <SecureRoute exact path="/schedule/add" component={AddSchedule} />
                    <SecureRoute exact path="/schedule/page/:pageNo" component={Schedule} />
                    <SecureRoute exact path="/schedule/edit/:scheduleId" component={UpdateSchedule} />
                    {
                      // routes for bus
                    }
                    <SecureRoute exact path="/bus" component={Bus} />
                    <SecureRoute exact path="/bus/page/:pageNo" component={Bus} />
                    <SecureRoute exact path="/bus/add" component={AddBus} />
                    <SecureRoute exact path="/bus/edit/:busId" component={UpdateBus} />
                    <SecureRoute exact path="/bus/requisition" component={BusRequisition} />
                    <SecureRoute exact path="/bus/requisition/page/:pageNo" component={BusRequisition} />
                    <SecureRoute exact path="/bus/requisition/add" component={CreateBusRequisition} />
                    <SecureRoute exact path="/bus/requisition/edit/:requisitionId" component={CreateBusRequisition} />
                    {
                      // routes for busRoute
                    }
                    <SecureRoute exact path="/route" component={BusRoute} />
                    <SecureRoute exact path="/route/page/:pageNo" component={BusRoute} />
                    <SecureRoute exact path="/route/add" component={AddBusRoute} />
                    <SecureRoute exact path="/route/edit/:routeId" component={UpdateBusRoute} />
                    {
                      // routes for stoppage
                    }
                    <SecureRoute exact path="/stoppage" component={Stoppage} />
                    <SecureRoute exact path="/stoppage/page/:pageNo" component={Stoppage} />
                    <SecureRoute exact path="/stoppage/add" component={AddStoppage} />
                    <SecureRoute exact path="/stoppage/edit/:stoppageId" component={UpdateStoppage} />
                    {
                      // routes for driver and stuff
                    }
                    <SecureRoute exact path="/driver" component={Driver} />
                    <SecureRoute exact path="/driver/page/:pageNo" component={Driver} />
                    <SecureRoute exact path="/stuff" component={Stuff} />
                    <SecureRoute exact path="/stuff/page/:pageNo" component={Stuff} />
                    <SecureRoute exact path="/driver/add" component={AddDriverOrStuff} />
                    <SecureRoute exact path="/stuff/add" component={AddDriverOrStuff} />
                    {
                      // routes for feedback
                    }
                    <SecureRoute exact path="/feedback" component={Feedback} />
                    {
                      // routess for notice
                    }
                    <SecureRoute exact path="/notice" component={Notice} />
                    <SecureRoute exact path="/notice/add" component={AddAnnouncement} />
                  </Switch>
                </div>
              </Col>
            </Row>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
