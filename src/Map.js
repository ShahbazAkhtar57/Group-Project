import React,{Component} from "react";
import Restaurant from "./restaurant";
import Geocode from "react-geocode"
import mapStyles from "./mapStyles";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();

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
        },
        error => {
          console.error(error);
        }
      )
    }





//Tadded
  onMarkerDragEnd = ( event ) => {
    let newLat = event.latLng.lat(),
        newLng = event.latLng.lng();
        Geocode.fromAddress(this.props.param).then(
        response => {
          let { newlat,newlng } = response.results[0].geometry.location;
          let name = response.results[0].formatted_address;
          this.setState( {
            mapPosition: {newlat, newlng},
            markerPosition: {newlat, newlng},
            
          })
        },
        error => {
          console.error(error);
        }
      )
        } 
      

//tadded


    shouldComponentUpdate(nextProps, nextState) {
      if ( this.state.mapPosition !== nextState.mapPosition)
      {
        return true
      } else if ( this.state.mapPosition === nextState.mapPosition)
      {
        return false
      }
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
                  name={'City Hall, NYC'}
                  position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}>
                <InfoWindow>
                <div style={{color:"black"}}>
								{/*this.props.param*/} {this.state.address}


              <Marker 
                  name={'City Hall, NYC'}
                  draggable={true}//toyin added this
                   ondDragEnd={this.onMarkerDragEnd}//toyin added this
                  position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}>
                 
                <InfoWindow>
                <div style={{color:"black"}}>
								{this.props.param} {this.state.address}


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
          <Restaurant />
        </div>
      )
  }
}