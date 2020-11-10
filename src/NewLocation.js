
import React, { Component } from "react";
import { Link } from 'react-router-dom';


export default class NewLocation extends Component {

  constructor (props) {
    super(props);  
    this.state = {
    location: "",
    latitude: "",
    longitude: ""
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      console.log("Geolocation Disabled");
    }
  }

  getCoordinates(position) {
    console.log(position);
    this.setState( {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

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
          <p >Finding food near you！</p>

        </div>

        <div className="loc-image">

          <ul className="img-list">
              <div className = "mid">
              <img  alt="food1" src="https://media.olivegarden.com/en_us/images/product/lasagna-fritta-dpv-590x365.jpg" />
              </div>
              <div className = "mid">
              <img  alt="food2" src="https://www.middletonplace.org/assets/img/restaurant-intro-3.jpg" />
             </div>
              <div className = "mid">
              <img  alt="food3" src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/07/14/Photos/Processed/iStockphoto-kqbD--621x414@LiveMint.jpg" />
             </div>
              <div className = "mid">
              <img  alt="food4" src="https://www.austinchronicle.com/binary/2daf/food_feature1.jpg" />
              </div>
              
             
          </ul>
          
        </div>


        
        <div className="container">
          

          <h1>My Location</h1>
          
          <h2 style={{color:"black"}}>Enter your current location here!</h2>
        
          <br></br>
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

              <button onClick={this.getLocation}>Use GPS</button>
              <p>Latitude: {this.state.latitude}</p>
              <p>Longitude: {this.state.longitude}</p>

          <br></br>

        </div>
      </div>



    );
  }
}

