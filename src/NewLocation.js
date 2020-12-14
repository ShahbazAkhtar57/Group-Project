
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PlacesAutocomplete, {
} from 'react-places-autocomplete';

export default class NewLocation extends Component {

  constructor (props) {
    super(props);  
    this.state = {location:'',
                  type: '',
                  radius:1
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
   
  }

  handleRadiusChange = (event) => {
    
    if(event.target.value !== 0) {
      this.setState({radius: (event.target.value)});
    }else {
      this.setState({radius:1});
    }
    
  }

  render() {

    console.log("The radius-------",this.state.radius);

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
          

          <h1 style={{fontSize:"50px"}}>My Location</h1>
          <br></br>
          
          <h2 style={{color:"black", fontSize:"28px",fontFamily:"Georgia"}}>Current Location</h2>
       
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
                placeholder: 'Search Places'
            
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

            <h2 style={{color:"black", fontSize:"28px",fontFamily:"Georgia"}}>Cuisine Type</h2>
            
            <input
                onChange={this.handleFoodChange}
                type="text"
                placeholder="Food Type"
                value={this.state.type}
                list="type"
               />
              <datalist id="type">
                <option value="food">food</option>
                <option value="bagels">bagels</option>  
                <option value="bakeries">bakeries</option>
                <option value="bento">bento</option>
                <option value="burgers">burgers</option>
                <option value="cafes">cafes</option>
                <option value="caribbean">caribbean</option>
                <option value="chinese">chinese</option>
                <option value="churros">churros</option>
                <option value="cupcakes">cupcakes</option>
                <option value="desserts">desserts</option> 
                <option value="donuts">donuts</option>
                <option value="delis">delis</option>
                <option value="empanadas">empanadas</option>
                <option value="german">german</option> 
                <option value="greek">greek</option>
                <option value="grocery">grocery</option> 
                <option value="halal">halal</option>
                <option value="indian">indian</option>
                <option value="italian">italian</option>
                <option value="kebab">kebab</option>
                <option value="macarons">macarons</option>
                <option value="mediterranean">mediterranean</option>
                <option value="pizza">pizza</option>
                <option value="pretzels">pretzels</option>
                <option value="sandwiches">sandwiches</option>
                <option value="soup">soup</option>
                <option value="spanish">spanish</option>
                <option value="steakhouses">steakhouses</option>
                <option value="thai">thai</option>
                <option value="turkish">turkish</option>
              </datalist>


              <h2 style={{color:"black", fontSize:"28px",fontFamily:"Georgia"}}>Radius</h2>
              <span className="combo">
              <input
                className="combo combo-text"
                onChange={this.handleRadiusChange}
                type="number"
                min="1"
                value={this.state.radius}
               />
               </span>
               <span style={{width:"50px", fontSize:"28px", color:"black", fontWeight:"bold"}}> mile</span>
              <br></br>
              
            <Link to={     
              {pathname: '/Map',
               state:this.state
              }}><button type="submit">Submit</button></Link>

          </form>
   
          <br />
              
              {/* GPS Location Button*/}

              <Link to={     
              {pathname: '/Map',
               state:this.state,
               geolocation: true
              }}><button onClick={this.useGeolocation}>Use GPS</button></Link>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>
      </div>

    );
  }
}

