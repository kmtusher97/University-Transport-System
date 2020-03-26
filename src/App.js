import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SideNavbar from "./component/SideNavbar";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Row>
          <Col md={2} style={{ padding: "10px 10px" }}>
            <SideNavbar />
          </Col>
          <Col md={10}>
            <Container role="main">
              <Switch>
                <Route path="/" />
                <Route path="/schedule" exact="true" />
                <Route path="/bus" exact="true" />
                <Route path="/feedback" exact="true" />
                <Route path="/notice" exact="true" />
              </Switch>
            </Container>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
