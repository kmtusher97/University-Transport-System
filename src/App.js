import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" />
          <Route path="/schedule" exact="true" />
          <Route path="/bus" exact="true" />
          <Route path="/feedback" exact="true" />
          <Route path="/notice" exact="true" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
