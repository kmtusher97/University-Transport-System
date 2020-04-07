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
                <Route
                  exact
                  path="/"
                  component={Schedule}
                />
                <Route
                  exact
                  path="/schedule"
                  component={Schedule}
                />
                <Route
                  exact
                  path="/schedule/add"
                  component={AddSchedule}
                />
                <Route
                  exact
                  path="/schedule/page/:pageNo"
                  component={Schedule}
                />
                <Route
                  exact
                  path="/schedule/edit/:scheduleId"
                  component={AddSchedule}
                />
                <Route
                  exact
                  path="/bus"
                  component={Bus}
                />
                <Route
                  exact
                  path="/route"
                  component={BusRoute}
                />
                <Route
                  exact
                  path="/bus/edit/:busId"
                />
                <Route
                  exact
                  path="/feedback"
                />
                <Route
                  exact
                  path="/notice"
                />
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
