import React,{Component} from "react";
import Geocode from "react-geocode"
import mapStyles from "./mapStyles";
import Card from "./card-class";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import axios from "axios";
Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();




/*
    Map Size
*/

const mapContainerStyle = {
  width: "90%",
  height: "500px",
  margin: "0 auto",
  position:"fixed",
  left:"40px",
  top:"20px",
  zIndex:"10",
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
            type: this.props.type,
            radius: this.props.radius,
            address: "New York City Hall",
            geolocation: this.props.geolocation,
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
      this.getLocation = this.getLocation.bind(this);
      this.getCoordinates = this.getCoordinates.bind(this);
     
  }



  /*
      Obtains GPS Location of the user
  */

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCoordinates);
      } else {
        console.log("Geolocation Disabled");
      }
    }

    /*
        Sets the map to the user's GPS location
    */

    getCoordinates(position) {
      //console.log(position);
      let g_lat = parseFloat(position.coords.latitude);
      let g_long = parseFloat(position.coords.longitude);
      this.setState( {
        mapPosition: { lat: g_lat, lng: g_long},
        markerPosition: { lat: g_lat, lng: g_long},
        address: "Your GPS Location",
      })
    }


    /*
        Runs when Map is loaded
    */

    componentDidMount() {

      /*
          If the user selected Geolocation, use their GPS location
      */

      if(this.state.geolocation === true)
      {
        this.getLocation();

        let restaurant_search =  `https://api.yelp.com/v3/businesses/search?categories=${this.state.type}&limit=20&latitude=${this.state.mapPosition.lat}&longitude=${this.state.mapPosition.lng}&radius=${this.state.radius}&sort_by=distance`
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}${restaurant_search}`, {
          headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
          },
          })

          /*
              Obtain Yelp API data
          */
          
          .then((res) => {
            this.setState({
              list:res.data.businesses
              })
          })

          /*
              If there is an error in Yelp API
          */
         
          .catch((err) => {
            console.log (err)
          })
      }

    /*
       Else updates the Map based on user's input by Geocoding
    */

     else {
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
              After updating the Map, obtain nearby food locations based on the user's location
          */
          
          let restaurant_search =  `https://api.yelp.com/v3/businesses/search?categories=${this.state.type}&limit=20&latitude=${this.state.mapPosition.lat}&longitude=${this.state.mapPosition.lng}&radius=${this.state.radius}&sort_by=distance`
          axios.get(`${'https://cors-anywhere.herokuapp.com/'}${restaurant_search}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            },
            })

            /*
                Obtain Yelp API data
            */
            
            .then((res) => {
              this.setState({
                list:res.data.businesses
                })
            })

            /*
                If there is an error in Yelp API
            */
           
            .catch((err) => {
              console.log (err)
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
          When the user enters a location or selects Geolocation, update the Map by re-rendering
          else do nothing 
      */

      if ( this.state.mapPosition !== nextState.mapPosition || this.state.list !== nextState.list)
      {
        return true
      } else if ( this.state.mapPosition === nextState.mapPosition)
      {
        return false
      }
    }

    createCard =(data)=> {
      return (
        <Card
          id = {data.id}
          img = {data.image_url}
          name = {data.name}
          location = {data.location.address1}
          type = {data.categories[0].title}
          rating = {data.rating}
          tel = {data.display_phone}
          distance = {data.distance}
          menu = {data.url}
        />
      )
    }


    /*
        Renders the Map with the data provided
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

      console.log("The radius-------",this.state.radius);
      return (


        <div>
          
            
              <nav>
                <ul>
                  <li><a href = "/">Food4You</a></li>
                  <li><a href ="/">New Location</a></li>
                </ul>
              </nav>

              {map}

          {/* return the specific restaurant details */}
          <div className="info">
              <div className="text"><p>Nearby Restaurants</p></div>
              <br></br>
              <br></br>
              {this.state.list.map(this.createCard)}
          </div>
          
        </div>
      )
  }
}