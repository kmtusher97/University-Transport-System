import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

/**Componnts */
import SideNavbar from "./component/SideNavbar";
import Schedule from "./component/schedule/Schedule";
import AddSchedule from "./component/schedule/AddSchedule";
import UpdateSchedule from "./component/schedule/UpdateSchedule";
import Bus from "./component/bus/Bus";
import AddBus from "./component/bus/AddBus";
import UpdateBus from "./component/bus/UpdateBus";
import BusRequisition from "./component/bus/BusRequisition";
import CreateBusRequisition from "./component/bus/CreateBusRequisition";
import BusRoute from "./component/route/BusRoute";
import AddBusRoute from "./component/route/AddBusRoute";
import UpdateBusRoute from "./component/route/UpdateBusRoute";
import Stoppage from "./component/stoppage/Stoppage";
import AddStoppage from "./component/stoppage/AddStoppage";
import UpdateStoppage from "./component/stoppage/UpdateStoppage";
import Driver from "./component/driverAndStuff/Driver";
import Stuff from "./component/driverAndStuff/Stuff";
import AddDriverOrStuff from "./component/driverAndStuff/AddDriverOrStuff";
import Notice from "./component/notice/Notice";
import AddAnnouncement from "./component/notice/AddAnnouncement";
import Feedback from "./component/feedback/Feedback";
import Login from "./component/Login";

/**Redux */
import { Provider } from "react-redux";
import store from "./Store";

import jwt_decode from 'jwt-decode';
import setJWTTokenToHeader from './security/setJWTTokenToHeader';
import { SET_CURRENT_USER } from "./actions/types";

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
            <Row>
              {
                window.location.pathname !== '/' && window.location.pathname !== '/login' &&
                (<Col md={2}>
                  <SideNavbar />
                </Col>)
              }
              <Col
                md={(window.location.pathname !== '/' && window.location.pathname !== '/login') ? 10 : 12}
                style={
                  (window.location.pathname !== '/' && window.location.pathname !== '/login') ? MainDivStyle : null
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
                  <Route exact path="/schedule" component={Schedule} />
                  <Route exact path="/schedule/add" component={AddSchedule} />
                  <Route exact path="/schedule/page/:pageNo" component={Schedule} />
                  <Route exact path="/schedule/edit/:scheduleId" component={UpdateSchedule} />
                  {
                    // routes for bus
                  }
                  <Route exact path="/bus" component={Bus} />
                  <Route exact path="/bus/page/:pageNo" component={Bus} />
                  <Route exact path="/bus/add" component={AddBus} />
                  <Route exact path="/bus/edit/:busId" component={UpdateBus} />
                  <Route exact path="/bus/requisition" component={BusRequisition} />
                  <Route exact path="/bus/requisition/page/:pageNo" component={BusRequisition} />
                  <Route exact path="/bus/requisition/add" component={CreateBusRequisition} />
                  <Route exact path="/bus/requisition/edit/:requisitionId" component={CreateBusRequisition} />
                  {
                    // routes for busRoute
                  }
                  <Route exact path="/route" component={BusRoute} />
                  <Route exact path="/route/page/:pageNo" component={BusRoute} />
                  <Route exact path="/route/add" component={AddBusRoute} />
                  <Route exact path="/route/edit/:routeId" component={UpdateBusRoute} />
                  {
                    // routes for stoppage
                  }
                  <Route exact path="/stoppage" component={Stoppage} />
                  <Route exact path="/stoppage/page/:pageNo" component={Stoppage} />
                  <Route exact path="/stoppage/add" component={AddStoppage} />
                  <Route exact path="/stoppage/edit/:stoppageId" component={UpdateStoppage} />
                  {
                    // routes for driver and stuff
                  }
                  <Route exact path="/driver" component={Driver} />
                  <Route exact path="/driver/page/:pageNo" component={Driver} />
                  <Route exact path="/stuff" component={Stuff} />
                  <Route exact path="/stuff/page/:pageNo" component={Stuff} />
                  <Route exact path="/driver/add" component={AddDriverOrStuff} />
                  <Route exact path="/stuff/add" component={AddDriverOrStuff} />
                  {
                    // routes for feedback
                  }
                  <Route exact path="/feedback" component={Feedback} />
                  {
                    // routess for notice
                  }
                  <Route exact path="/notice" component={Notice} />
                  <Route exact path="/notice/add" component={AddAnnouncement} />

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
