import React,{Component} from "react";
import Geocode from "react-geocode"
import mapStyles from "./mapStyles";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import axios from "axios";
Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();

let radius = 1600;
let category = "Food"

/*
    Map Size
*/

const mapContainerStyle = {
  width: "100%",
  height: "800px",
  margin: "30px auto"
};

/*
  Map Options
*/

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
	    list:[],
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

    /*
        Runs when Map is loaded
    */

    componentDidMount() {

      /*
          Updates the Map based on user's input by Geocoding
      */

      Geocode.fromAddress(this.props.param).then(
        response => {
          let { lat,lng } = response.results[0].geometry.location;
          let name = response.results[0].formatted_address;
          this.setState( {
            mapPosition: {lat, lng},
            markerPosition: {lat, lng},
            address: name
          })

          /*
              After updating the Map, obtain the 5 nearby food locations based on the user's location
          */

          let restaurant_search =  `https://api.yelp.com/v3/businesses/search?categories=${category}&limit=20&latitude=${this.state.mapPosition.lat}&longitude=${this.state.mapPosition.lng}&radius=${radius}&sort_by=distance`
          axios.get(`${'https://cors-anywhere.herokuapp.com/'}${restaurant_search}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            },
            })

            /*
                Obtain Yelp API data
            */

            .then((res) => {
              console.log(res.data)
	      this.setState({
                list:res.data.businesses
                })
            })

            /*
                If there is an error in Yelp API
            */
           
            .catch((err) => {
              console.log ('Restaurant Search Error')
            })
        },

        /*
            If there is an error in Geocode API
        */

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

      /*
          When the user enters a location, update the Map by re-rendering
          else do nothing 
      */

      if ( this.state.mapPosition !== nextState.mapPosition  || this.state.list !== nextState.list)
      {
        return true
      } else if ( this.state.mapPosition === nextState.mapPosition)
      {
        return false
      }
    }

    /*
        Renders the Map with the options provided
    */

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

      /*
          Load Google Maps using Google Maps API key and using a map style
      */

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
	      <hr></hr>
  	       <ul>
                {
                  this.state.list.map((value,key) => {
                    return<div>
                      <li key={key}>{value.name}</li>

                      <li key={key}>{value.location.address1}</li>
                      <br></br>
                    </div>
                  })
                }
              </ul>
             
            </div>
            <div className="details">
            <h1>Restaurant Information:</h1>
              <hr></hr>

              <ul>
                {
                  this.state.list.map((value,key) => {
                    return<div>
                      <li key={key}>{value.name}</li>
                      <li key={key}>Type: {value.categories[0].title}</li>
                      <li key={key}>Phone Number: {value.display_phone}</li>
                      <li key={key}>Rating: {value.rating}</li>
                      <li key={key}>Distance: {value.distance}</li>
                      <li key={key}>Reviews:</li>
                      <hr></hr>
                    </div>
                  })
                }
              </ul>

               
            </div>
          </div>
		  
        </div>
      )
  }
}
