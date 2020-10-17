import React from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import MapPage from "./MapPage";
import Location from "./NewLocation";



function App() {
  return ( 
    <Router>
        <Switch>
        <Route exact path = "/" component = {Location} />
        <Route path = "/Map" component = {MapPage} />
      </Switch>
    </Router>
  );
}


export default App;
