import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          {/* <Route path="/game/:id" component={} /> */}
          {/* <Route path="/new-game" component={} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
