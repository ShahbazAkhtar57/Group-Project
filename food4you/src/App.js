import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Map from "./Map";
import Location from "./Location";

function App() {
  return ( 
    <BrowserRouter>
      <div>
        <Route exact path = "/" component = {Location} />
        <Route path = "/Map" component = {Map} />
      </div>
    </BrowserRouter>
  );
}


export default App;
