
import React, { Component } from "react";
import { Link } from 'react-router-dom';


export default class NewLocation extends Component {
  state = {
    location: ""
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ location: event.target.value });
  }



  render() {

    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">Food 4 You!</h1>
          <hr />
          <p className="lead">Finding food around your location！</p>

        </div>
        <div className="container">

          <h1>My Location</h1>

          <form>

            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Where's your location?"
              value={this.state.location}
              required />
            
            <br></br>
            <Link to={     
              {pathname: '/Map',
               state:this.state
              }}><button type="submit">Submit</button></Link>

          </form>
          <br />


          <br></br>

        </div>
      </div>



    );
  }
}

