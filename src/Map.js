import React from "react";
import {Link, useLocation} from "react-router-dom";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
  } from "@react-google-maps/api";

import Geocode from "react-geocode"
import mapStyles from "./mapStyles";

  const libraries = ["places"];
  const mapContainerStyle = {
    width: "1000px",
    height: "800px",
    margin:"0",
    padding:"0"
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

function changeCenter(lat, lng) {
  DefaultCenter.lat = lat;
  DefaultCenter.lng = lng;
}

function Map() {

  let location = useLocation();

  console.log(location);
  let userLocation = location.state.location;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
      });
      if(loadError) return "Error loading maps";
      if(!isLoaded) return "Loading Maps";
      /*
      Geocode.fromAddress(location.state.location).then(
        response => {
         let { lat, lng } = response.results[0].geometry.location;
         setTimeout(() => {
          let newlat = lat;
          let newlng = lng;
          changeCenter(newlat, newlng);
         }, 2000);
         console.log(DefaultCenter.lat, DefaultCenter.lng)
        },
        error => {
          console.error(error);
        }
      )
      */
    //console.log(newlat, newlng);
    //changeCenter(newlat, newlng);
    //changeCenter(40.7678398, -73.9645291);
    return (
        <div>
        <nav>
           <ul>
             <li><a href = "/">Food4You</a></li>
             <li><a href ="/">New Location</a></li>
           </ul>
         </nav>

        
        <h2>Your Location is {userLocation}</h2>
        
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
        </div>
       
    );

}

export default Map;
