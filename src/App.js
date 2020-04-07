import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

/**Componnts */
import SideNavbar from "./component/SideNavbar";
import Schedule from "./component/Schedule";
import Bus from "./component/Bus";
import BusRoute from "./component/BusRoute";
import AddSchedule from "./component/AddSchedule";

function App() {
  return (
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
              <Switch>
                <Route path="/" exact={true}>
                  <Schedule />
                </Route>
                <Route
                  exact
                  path="/schedule"
                  component={Schedule}
                />
                <Route path="/schedule/add" exact={true}>
                  <AddSchedule />
                </Route>
                <Route
                  exact
                  path="/schedule/page/:pageNo"
                  component={Schedule}
                />
                <Route path="/schedule/edit/:scheduleId" exact={true}>
                  <AddSchedule />
                </Route>
                <Route path="/bus" exact={true}>
                  <Bus />
                </Route>
                <Route path="/route" exact={true}>
                  <BusRoute />
                </Route>
                <Route path="/bus/edit/:busId" exact={true}></Route>
                <Route path="/feedback" exact={true} />
                <Route path="/notice" exact={true} />
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
