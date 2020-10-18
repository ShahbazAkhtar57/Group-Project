import React, { Component } from 'react';
import Map from './Map';

export default class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            param:props.location.state,
            search:props.location.search,
        }
    }
    

    render() {
		return(
			<div style={{ margin: '100px' }}>
				<Map
                    param={this.props.location.state.location}
					//google={this.props.google}
					center={{lat: 40.7128, lng: -74.0060}}
					height='400px'
					zoom={16}
				/>
			</div>
		);
	}
}