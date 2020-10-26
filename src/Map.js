import React,{Component} from "react";
import Restaurant from "./restaurant";
import Geocode from "react-geocode"
import mapStyles from "./mapStyles";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import axios from "axios";
Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();

let radius = 1600;
let category = "Food"

const mapContainerStyle = {
  width: "100%",
  height: "800px",
  margin: "30px auto"
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

export default class Map extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            param:this.props.param,
            address: "",
	          resLoc: "",
            mapPosition: {
              lat: this.props.center.lat,
              lng: this.props.center.lng
            },
            markerPosition: {
              lat: this.props.center.lat,
              lng: this.props.center.lng
            },
      }
  }

    componentDidMount() {
      Geocode.fromAddress(this.props.param).then(
        response => {
          let { lat,lng } = response.results[0].geometry.location;
          let name = response.results[0].formatted_address;
          this.setState( {
            mapPosition: {lat, lng},
            markerPosition: {lat, lng},
            address: name
          })
          let restaurant_search =  `https://api.yelp.com/v3/businesses/search?categories=${category}&limit=5&latitude=${this.state.mapPosition.lat}&longitude=${this.state.mapPosition.lng}&radius=${radius}&sort_by=distance`
          axios.get(`${'https://cors-anywhere.herokuapp.com/'}${restaurant_search}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            },
            })
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log ('Restaurant Search Error')
            })
        },
        error => {
          console.error(error);
        }
      )
    }
 
onMarkerDragEnd=(event)=>
{
     let newLat = event.latLng.lat(),
     newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState({
                   address: (address) ? address : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    shouldComponentUpdate(nextProps, nextState) {
      if ( this.state.mapPosition !== nextState.mapPosition)
      {
        return true
      } else if ( this.state.mapPosition === nextState.mapPosition)
      {
        return false
      }
    }

    handleChange = (event) => {
      console.log(event.target.value);
      this.setState({ 
        resLoc: event.target.value});
    }

    getDetails = (e) => {
      e.preventDefault();
      console.log("New resLocation", this.state.resLoc);
    }

    render() {
      const AsyncMap = withScriptjs(
        withGoogleMap(
          props => (
            <GoogleMap 
            options={options}
            defaultZoom={this.props.zoom}
            defaultCenter={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}>
              <Marker
                  name={'Default Marker'}
                  draggable={true}
                  onDragEnd={this.onMarkerDragEnd}
                  position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}>
                <InfoWindow>
                <div style={{color:"black"}}>
							   {this.state.address}
							  </div>
                </InfoWindow>       
              </Marker>
            </GoogleMap>
          )
        )
      );
      let map;
      if( this.props.center.lat !== undefined ) 
      {
        map = <div>
          <AsyncMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
					loadingElement={<div style={mapContainerStyle}/>}
					containerElement={<div style={mapContainerStyle}/>}
          mapElement={<div style={mapContainerStyle}/>}
				/>
        </div>
      }
      return (
        <div>

          <nav>
             <ul>
               <li><a href = "/">Food4You</a></li>
               <li><a href ="/">New Location</a></li>
             </ul>
           </nav>
          {map}

          <div className = "resList">
            <div className = "list">
              <h1>Restaurant List</h1>
             
              <ul>
                <li>restaurant1</li>
                <li>location1</li>
              </ul>
              <br></br>
              <ul>

                <li>restaurant2</li>
                <li> location2</li>
              </ul>
              <br></br>
              <ul>
                <li>restaurant3</li>
                <li> location3</li>
              </ul>
              <br></br>
              <ul>
                <li>restaurant4</li>
                <li> location4</li>
              </ul>
              <br></br>
              <ul>
                <li>restaurant5</li>
                <li> location5</li>
              </ul>
             
            </div>
            <div className="details">
            <h1>Restaurant Information:</h1>
              <hr></hr>
              <ul>
                <li>restaurant1</li>
                <li>Phone Number: </li>
                <li>Rating: </li>
                <li>Price:</li>
                <li>Reviews:</li>
              </ul>
              <hr></hr>
              <ul>
                <li>restaurant2</li>
                <li>Phone Number: </li>
                <li>Rating: </li>
                <li>Price:</li>
                <li>Reviews:</li>
              </ul>
              <hr></hr>
              <ul>
                <li>restaurant3</li>
                <li>Phone Number: </li>
                <li>Rating: </li>
                <li>Price:</li>
                <li>Reviews:</li>
              </ul>
              <hr></hr>
              <ul>
                <li>restaurant4</li>
                <li>Phone Number: </li>
                <li>Rating: </li>
                <li>Price:</li>
                <li>Reviews:</li>
              </ul>
              <hr></hr>
              <ul>
                <li>restaurant5</li>
                <li>Phone Number: </li>
                <li>Rating: </li>
                <li>Price:</li>
                <li>Reviews:</li>
              </ul>
            </div>
          </div>
		  
          {/* <Restaurant /> */}
        </div>
      )
  }
}