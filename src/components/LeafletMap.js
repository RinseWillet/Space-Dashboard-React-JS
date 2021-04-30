import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

//position of the NASA Insight probe
var position = [4.5, 135.6];

const Wrapper = styled.div`
width: $(props => props.width);
heigth: $(props => props.height);
`;

export default class LeafletMap extends React.Component {

    componentDidMount() {        
        this.map = L.map('map', {
            center: position,
            zoom: 1,
            tms: true,
            zoomControl: false,
            // tileSize: 256,
            // zoomOffset: -1,
        });

        L.tileLayer( `http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png`, { 
            detectRetina: true, maxZoom: 5, maxNativeZoom: 5,
			zoom: 1,
			tms: true,
        }).addTo(this.map).setZIndex(0);        
      

        L.circleMarker(position, {
            radius: 3,
            fillColor: "#33ff33",
            color: " #33ff33",
            weight: 6,
            opacity: 0.2,
            fillOpacity: 0.8
        }).addTo(this.map)
    .bindPopup('NASA Insight lander, launched 5th of May 2018 - landed 26th of November 2018. <a href="https://mars.nasa.gov/insight/">Nasa</a>');    
    }

    render() {
        return (
        <Wrapper width="300px" height="300px" id="map" />
        )         
    }
}

