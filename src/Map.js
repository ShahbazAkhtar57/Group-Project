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
        },
        error => {
          console.error(error);
        }
      )
    }
    //tt starts

onMarkerDragEnd=(event)=>
{
     let newLat = event.latLng.lat(),
     newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
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
      getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };


//tt ends


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
                  name={'City Hall, NYC'}
                  draggable={true}
                  onDragEnd={this.onMarkerDragEnd}
                  position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}>
                <InfoWindow>
                <div style={{color:"black"}}>
								{/*this.props.param*/} {this.state.address}
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

		  <div className = "container"> 
                  <h1>Interested Resaurant</h1>
                  <form>
                      <input
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Resraurant Location"
                          Value={this.state.resLoc}
                        />
                        <button onClick={this.getDetails}>Get More Details</button>
                  </form>
                 
            </div>

          <Restaurant />
        </div>
      )
  }
}
