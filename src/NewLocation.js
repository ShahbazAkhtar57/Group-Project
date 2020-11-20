
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class NewLocation extends Component {

  constructor (props) {
    super(props);  
    this.state = {location:''};
  }


 handleChange = location => {
    this.setState({ location});
  };
 
  handleSelect = location => {
      this.setState({ location})
  };
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
            <PlacesAutocomplete 
            value={this.state.location}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
             >
           {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...'
                //className: 'lt',
              })}
            />
             <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#blue', cursor: 'pointer' }
                  : { backgroundColor: '#blue', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
            <br></br>
            <Link to={     
              {pathname: '/Map',
               state:this.state
              }}><button type="submit">Submit</button></Link>

          </form>
   
          <br />

              <Link to={     
              {pathname: '/Map',
               state:this.state,
               geolocation: true
              }}><button onClick={this.useGeolocation}>Use GPS</button></Link>

          <br></br>

        </div>
      </div>

    );
  }
}

