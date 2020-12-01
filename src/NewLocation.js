
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PlacesAutocomplete, {
} from 'react-places-autocomplete';

export default class NewLocation extends Component {

  constructor (props) {
    super(props);  
    this.state = {location:'',
                  type: ''
    }
  }


 handleChange = location => {
    this.setState({ location});
  };
 
  handleSelect = location => {
      this.setState({ location})
  };

  handleFoodChange = (event) => {
   
    this.setState({ type : event.target.value });
    // console.log("The food type-------",this.state.type);
  }

  render() {

    console.log("The food type-------",this.state.type);

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
          <br></br>
          
          <h2 style={{color:"black"}}>Enter your current location here!</h2>
       
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
                  : { backgroundColor: '#FFCC00', 
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

            <h2 style={{color:"black"}}>Enter the cuisine type!</h2>
            <h4 style={{color:"black"}}>you can choose food for all cuisine types</h4>
            
            <input
                onChange={this.handleFoodChange}
                type="text"
                placeholder="Cuisine Type"
                value={this.state.type}
                list="type"
               />
              <datalist id="type">
                <option value="food">food</option>
                <option value="bagels">bagels</option>  
                <option value="bakeries">bakeries</option>
                <option value="desserts">desserts</option> 
                <option value="halal">halal</option>
                <option value="chinese">chinese</option>
                <option value="pizza">pizza</option>
                <option value="donuts">donuts</option>
                <option value="cafes">cafes</option>
                <option value="macarons">macarons</option>
                <option value="pretzels">pretzels</option>
                <option value="greek">greek</option>
                <option value="german">german</option>
                <option value="italian">italian</option>
                <option value="caribbean">caribbean</option>
                <option value="mediterranean">mediterranean</option>
                <option value="indian">indian</option>
                <option value="turkish">turkish</option>
                <option value="steakhouses">steakhouses</option>
                <option value="delis">delis</option>
                <option value="burgers">burgers</option>
                <option value="sandwiches">sandwiches</option>
                <option value="grocery">grocery</option> 
                <option value="kebab">kebab</option>
              </datalist>
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

