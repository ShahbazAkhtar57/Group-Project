
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PlacesAutocomplete, {
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
              <img  alt="food1" src="https://i.pinimg.com/originals/a7/cf/28/a7cf28293fc4ff9cfd8a31b228193fd9.jpg" />
              </div>
              <div className = "mid">
              <img  alt="food2" src="https://cdn1.img.sputnik.md/images/2082/08/20820866.jpg" />
             </div>
              <div className = "mid">
              <img  alt="food3" src="https://imageproxy.themaven.net//https%3A%2F%2Fimages.saymedia-content.com%2F.image%2FMTc0NDI4MzIzNjg0ODIwNjE0%2Ffilet-mignon-side-dishes.jpg" />
             </div>
              <div className = "mid">
              <img  alt="food4" src="https://i.pinimg.com/originals/0b/53/5e/0b535e2ec3f4f6330596282a164f66bf.jpg" />
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
            
              })}
            />
             <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style 
                const style = suggestion.active
                  ? {  backgroundColor: '#FAAC23', 
                    cursor: 'pointer' }
                  : { backgroundColor: '#F3BE61', 
                  cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span style={{color:"black"}}>{suggestion.description}</span>
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

