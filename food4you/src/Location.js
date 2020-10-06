import React, { useState } from "react";
import {Link} from "react-router-dom";

function Location() {
    const [location, setLocation] = useState("");
    const [headingText, setHeading] = useState("");
   

    function handleChange(event) {
        console.log(event.target.value);
        setLocation(event.target.value);
      }
    
      function handleClick(event) {
        setHeading(location);
    
        event.preventDefault();
      }
      

      return (
        <div className="container">
          <h1>My Location</h1>
          {/* <form onSubmit={handleClick}> */}
          <form>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Where's your location?"
              value={location}
            />
            <br></br>
            <button type="submit" onClick = {handleClick}>Show My Location</button>
            <br></br>
            <br></br>
            <Link to = {'/Map'}><button type="submit">Submit</button></Link>
            
          </form>
          <br />
          <h2>{headingText}</h2> 
          
          <br></br>
          
        </div> 
        
      );
}

export default Location;