import React from 'react';
import GoogleMapReact from 'google-map-react';

//import custom map styles from JSON file
const mapStyle = require('./MapStyle.json')

//API for the ISS position
const ISS_URL = "http://api.open-notify.org/iss-now.json"

//Key for google maps api (in .env file)
const MAP_KEY = process.env.REACT_APP_GOOGLE

//image icon for the spacestation
const img = <img src={require(`./markers/iss-marker.png`)} alt="iss" height="50px" />
const SpaceStation = ({ img }) => <div>{img}</div>

//image icon for user location
const joop = <img src={require(`./markers/square.png`)} alt="user" height="8px" />
const UserLocation = ({ img }) => <div>{joop}</div>

export default class ISSMap extends React.Component {

    state = {

        centerISS: {
            lat: 0,
            lng: 0
        },

        centerUser: {
            lat: 0,
            lng: 0
        },

        zoom: 2
    }

    componentDidMount() {
        this.getCoordinates()
        this.getUserLocation()
        this.interval = setInterval(this.getCoordinates, 3000)
        this.interval = setInterval(this.getUserLocation, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

   getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
               centerUser: {
                   lat: position.coords.latitude,
                   lng: position.coords.longitude
                }});
        },
        error => console.log(error)
      );
    }  
  
    getCoordinates = () => {
        fetch(ISS_URL)
            .then(res => res.json())
            .then(data => this.setState({
                centerISS: {
                    lat: data.iss_position.latitude,
                    lng: data.iss_position.longitude
                }
            }),
            error => console.log(error)
            )
    }

    render() {
        
        var latISS = this.state.centerISS.lat;
        var lngISS = this.state.centerISS.lng;        
        var latUser= this.state.centerUser.lat;
        var lngUser= this.state.centerUser.lng;     
        return (
            <div>
                {
                    (this.state.loading)
                        ? <h2 className="text-center">Loading...</h2>
                        :
                        <div>
                            <div className="iss-text">
                                <p>Latitude: {latISS}</p>
                                <p>Longitude: {lngISS}</p>
                            </div>
                            <div className="iss-map">
                                <GoogleMapReact className="iss-map"
                                    ref={(ref) => { this.map = ref; }}
                                    options={{ styles: mapStyle }}
                                    bootstrapURLKeys={{ key: MAP_KEY }}
                                    center={{ lat: latISS, lng: lngISS }}
                                    zoom={this.state.zoom}
                                    onChildClick={this._onChildClick}
                                >

                                    <SpaceStation
                                        lat={latISS}
                                        lng={lngISS}
                                        img={img}
                                        text={"ISS"}
                                    />

                                    <UserLocation
                                    lat={latUser}
                                    lng={lngUser}                                    
                                    text={"user"}
                                    />

                                </GoogleMapReact>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

