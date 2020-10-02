import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';


//API for the ISS position
const ISS_URL = "http://api.open-notify.org/iss-now.json"

const Wrapper = styled.div`
width: $(props => props.width);
heigth: $(props => props.height);
`;

export default class ISSLeafletMap extends React.Component {

    state = {        
        center: {
             lat: null,
             lng: null
             }
    }

    componentDidMount() {        
        this.getCoordinates()   
        this.interval = setInterval(this.getCoordinates, 3000)         
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getCoordinates = () => {
        console.log(this.state.center.lat)
        fetch(ISS_URL)
            .then(res => res.json())
            .then(data => this.setState({
                center: {
                    lat: data.iss_position.latitude,
                    lng: data.iss_position.longitude
                }
            }))
    }

    // letsMap() {
    //     this.map = L.map('map', {
    //         center: [this.state.center.lat, this.state.center.lng],
    //         zoom: 3,
    //         tms: true,
    //         zoomControl: false,
    //         tileSize: 256,
    //         zoomOffset: -1,
    //     })

    //     L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    //         detectRetina: true, maxZoom: 20, maxNativeZoom: 20
    //     }).addTo(this.map).setZIndex(0);

    //     L.circleMarker({lat: this.state.center.lat, lng: this.state.center.lng}, {
    //         radius: 3,
    //         fillColor: "#33ff33",
    //         color: " #33ff33",
    //         weight: 6,
    //         opacity: 0.2,
    //         fillOpacity: 0.8
    //     }).addTo(this.map)
    //         .bindPopup('ISS');
    // }


    render() {
        // console.log("LAT:", this.state.center.lat, " LNG:", this.state.center.lng)
        // L.circleMarker({lat: this.state.center.lat, lng: this.state.center.lng}, {
        //     radius: 3,
        //     fillColor: "#33ff33",
        //     color: " #33ff33",
        //     weight: 6,
        //     opacity: 0.2,
        //     fillOpacity: 0.8
        // }).addTo(this.map)
        //     .bindPopup('ISS');
        return (
            (this.state.loading)
                ? <h2>Loading...</h2>
                :
                <div>
                    <div className="iss-text">
                        <p>Latitude: {this.state.center.lat}</p>
                        <p>Longitude: {this.state.center.lng}</p>
                    </div>
                    <div className="iss-map" id="map">
                        {/* <Wrapper width="300px" height="300px" /> */}

                        <Map center={[this.state.center.lat, this.state.center.lng]}
                            ref={(ref) => { this.map = ref; }}
                            zoom={this.state.zoom}
                            tms={true}                            
                        >

                            <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                                maxZoom={20}
                                detectRetina={true}                                
                                maxNativeZoom={10}
                                zoom={3}                                
                            />

                            <CircleMarker center={[this.state.center.lat, this.state.center.lng]}
                                radius={3}
                                fillColor="#33ff33"
                                color="#33ff33"
                                weight={6}
                                opacity={0.2}
                                fillOpacity={0.8}
                            />
                        </Map>
                    </div>
                </div>
        )
    }
}


