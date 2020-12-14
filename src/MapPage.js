import React, { Component } from 'react';
import Map from './Map';



export default class MapPage extends Component {

    constructor(props) {
		super(props);
        this.state = {
            param:props.location.state,
			search:props.location.search,
			geolocation: props.location.geolocation,
			
        }
    }
	

    render() {

		return(
			/*
				Creates a Map Component 
			*/
			<div>
				<Map
                    param={this.props.location.state.location}
					center={{lat: 40.7128, lng: -74.0060}}
					zoom={16}
					geolocation = {this.state.geolocation}
					type={this.props.location.state.type}
					radius={(this.props.location.state.radius * 1600)}
				/>
			</div>
		);
	}
}