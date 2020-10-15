import React from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Map from "./NewMap";
import Location from "./NewLocation";



function App() {
  return ( 
    <Router>
        <Switch>
        <Route exact path = "/" component = {Location} />
        <Route path = "/Map" component = {Map} />
      </Switch>
    </Router>
  );
}


export default App;
