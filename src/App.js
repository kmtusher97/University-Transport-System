import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

/**Componnts */
import SideNavbar from "./component/SideNavbar";
import Schedule from "./component/Schedule";
import Bus from "./component/Bus";

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
              height: "1200px"
            }}
          >
            <Container role="main">
              <Switch>
                <Route path="/" exact={true}>
                  <Schedule />
                </Route>
                <Route path="/schedule" exact={true}>
                  <Schedule />
                </Route>
                <Route path="/bus" exact={true}>
                  <Bus />
                </Route>
                <Route path="/bus/edit/:busId" exact={true}></Route>
                <Route path="/feedback" exact={true} />
                <Route path="/notice" exact={true} />
              </Switch>
            </Container>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
