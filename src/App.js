import React from "react";
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

/**Redux */
import { Provider } from "react-redux";
import store from "./Store";


function App() {
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
            <Col md={2}>
              <SideNavbar />
            </Col>
            <Col
              md={10}
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                height: "1350px"
              }}
            >
              <div role="main">

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
                <Route exact path="/feedback" />
                {
                  // routess for notice
                }
                <Route exact path="/notice" component={Notice} />

              </div>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
