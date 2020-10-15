import React,{Component} from "react";
import Restaurent from "./restaurent";
import {useLocation} from "react-router-dom";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
  } from "@react-google-maps/api";

/*
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';*/

import Geocode from "react-geocode"
import mapStyles from "./mapStyles";



const libraries = ["places"];
const mapContainerStyle = {
  width: "80%",
  height: "800px",
  margin: "30px auto"
};

let DefaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

const onLoadmarker = marker => {
    console.log('marker: ', marker)
  }

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();


function Map() {

    let location = useLocation();
  
    //console.log(location);
    let userLocation = location.state.location;
  
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: [libraries],
    });
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";
    Geocode.fromAddress(location.state.location).then(
        response => {
        let { lat,lng } = response.results[0].geometry.location;
        DefaultCenter.lat = lat;
        DefaultCenter.lng = lng;
        console.log(`Default Center is ${DefaultCenter.lat} ${DefaultCenter.lng} after editing`)
        },
        error => {
        console.error(error);
        }
    )
      //console.log(newlat, newlng);
      //changeCenter(newlat, newlng);
      //changeCenter(40.7678398, -73.9645291);
      /*
      geocodeByAddress(userLocation)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
      */
    console.log(`Default Center is ${DefaultCenter.lat} ${DefaultCenter.lng} at default`)
    return (
          <div>
          <nav>
             <ul>
               <li><a href = "/">Food4You</a></li>
               <li><a href ="/">New Location</a></li>
             </ul>
           </nav>
  
          
          <GoogleMap
  
            mapContainerStyle={mapContainerStyle}
            zoom ={16}
            center = {DefaultCenter}
            options ={options}
            >
              <Marker
              onLoadmarker={onLoadmarker}
              position={DefaultCenter}
            >
              <InfoWindow>
                <div style={{color:"black"}}>
                  {userLocation}
                </div>
                </InfoWindow>
            </Marker>
          </GoogleMap>

          <h1 style={{textAlign:"center", width:"50%", color:"#50a3a2",
          border:"1px solid #eee", borderRadius:"0.6rem",margin:"auto",backgroundColor:"#eee"
          }}>
          Your current location is {location.state.location}</h1>
          </div>
         
      );
  
  }


export default class NewMap extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            param:props.location.state,
            search:props.location.search,
        };
        console.log("state-----:",this.props);
    }

    render() {
        return (
            <div>
                <Map></Map>

                {/* <h2>Your Location is {this.props.location.state.location}</h2> */}

                <Restaurent />
            </div>
        );
    }
}

