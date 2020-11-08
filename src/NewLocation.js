
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
          <p >Finding food around your location！</p>

        </div>

        <div className="loc-image">

          <ul className="img-list">
              <div className = "mid">
              <img  src="https://media.olivegarden.com/en_us/images/product/lasagna-fritta-dpv-590x365.jpg" />
              </div>
              <div className = "mid">
              <img  src="https://www.middletonplace.org/assets/img/restaurant-intro-3.jpg" />
             </div>
              <div className = "mid">
              <img  src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/07/14/Photos/Processed/iStockphoto-kqbD--621x414@LiveMint.jpg" />
             </div>
              <div className = "mid">
              <img  src="https://www.austinchronicle.com/binary/2daf/food_feature1.jpg" />
              </div>
              
             
          </ul>
          
        </div>


        
        {/* <div className="jumbotron">
          <h1 className="display-3">Food 4 You!</h1>
          <hr />
          <p className="lead">Finding food around your location！</p>

        </div> */}
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


          <br></br>

        </div>
      </div>



    );
  }
}

