import React, { useState } from "react";
import {Link} from "react-router-dom";
import Map from "./Map";


function Location() {


    const [street, setStreet] = useState("");
    const [location, setLocation] = useState("");

    const [streetText, setStrText] = useState("");
    const [locationText, setCityText] = useState("");


    function handleChange(event) {
        console.log(event.target.value);
        setLocation(event.target.value);
      }

      function handleStreetChange(event) {
        console.log(event.target.value);
        setStreet(event.target.value);
      }

      function handleClick(event) {
        setStrText(street);
        setCityText(location);

        // this.props.history.push("/Map/" + 8)

        event.preventDefault();


      }


      return (
        <div>
          <div className="jumbotron">
              <h1 className="display-3">Food 4 You!</h1>
              <hr />
              <p className="lead">Finding food around your location！</p>

          </div>
          <div className="container">

            <h1>My Location</h1>
            {/* <form onSubmit={handleClick}> */}
            <form>

              <input
                onChange={handleStreetChange}
                type="text"
                placeholder="Where's your street?"
                value={street}
                required
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Where's your city?"
                value={location}
                required
              />
              <br></br>
              <button type="submit" onClick = {handleClick}>Show My Location</button>
              <br></br>
              <br></br>
              <Link to="/Map" params={{ propId: "123"}}
              ><button type="submit">Submit</button></Link>

            </form>
            <br />

            <h2>{streetText}</h2>
            <h2>{locationText}</h2>

            <br></br>

          </div>
        </div>

      );
}

export default Location;
