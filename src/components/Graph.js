import React, { Component } from "react";
import '../../src/App.css';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import GetData from "./GetDataWeatherObject";

import axios from "axios";

//API key NASA from .env file in root
const apiKey = process.env.REACT_APP_KEY;

//component to generate the graph in the MarsWeather JS
export default class Graph extends Component {

  state = {
    weatherData: "",
    optionUnit: "av",
    optionType: "AT"   
  }

  //JSON Object retrieval from NASA API
  componentDidMount() {
    axios.get("https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0")
      .then(res => {
        this.setState({
          weatherData: res.data
        });
      })
      .catch((res) => {
        console.log("Error in data fetching")
      },      
      );      
    this.onChangeTypeValue = this.onChangeTypeValue.bind(this);
    this.onChangeUnitValue = this.onChangeUnitValue.bind(this);    
  }

  
  //change unit (average, min, max)
  onChangeUnitValue(event) {    
    this.setState({ optionUnit: event.target.value },
    );
  }

  //change type (temperature, windspeed, pressure)
  onChangeTypeValue(event) {    
    this.setState({ optionType: event.target.value },      
    );    
  } 

  render() {

    //set the title Y axis
    var yAxisTitle = "TEMPERATURE"

    if(this.state.optionType === "AT") {
      yAxisTitle = "TEMPERATURE"
    } else if(this.state.optionType === "HWS") {
      yAxisTitle = "WINDSPEED"
    } else if(this.state.optionType === "PRE") {
      yAxisTitle = "PRESSURE"
    }

    //get the data from JSON object following radio selector
    var data = GetData(this.state.weatherData, [this.state.optionType], [this.state.optionUnit]);
   
    //calculate domain for Y axis  
    var yMin = (Math.min.apply(Math, data.map(function (o) { return o.y; }))) - 5;
    var yMax = (Math.max.apply(Math, data.map(function (o) { return o.y; }))) + 5;
    var Domain = [yMin, yMax];

    return (
      <div className="nasa-weather" onChange={this.onChangeValue}>
        <div className="nasa-weather-radio" onChange={this.onChangeTypeValue}>
          <input type="radio" value="AT" name="optionsType" /> Temperature
          <input type="radio" value="HWS" name="optionsType" /> Windspeed
          <input type="radio" value="PRE" name="optionsType" /> Pressure
      </div>
        <div className="nasa-weather-radio" onChange={this.onChangeUnitValue}>
          <input type="radio" value="av" name="optionsUnit" /> Average
          <input type="radio" value="mn" name="optionsUnit" /> Minimum
          <input type="radio" value="mx" name="optionsUnit" /> Maximum
      </div>
        <div className="graph">
          <XYPlot height={350} width={1000} yDomain={Domain}>
            <XAxis tickSizeInner={0} tickSizeOuter={5} tickTotal={8} style={{ line: { strokeWidth: 0.75, stroke: '#33ff33' } }} title="SOL DAYS" position='middle' />
            <YAxis tickSizeInner={0} tickSizeOuter={5} style={{ line: { strokeWidth: 0.75, stroke: '#33ff33' } }} title={yAxisTitle} position='middle' />
            <LineSeries data={data} color="#33ff33" style={{ strokeWidth: 1 }} />
            {/* <LineSeries data={GetData(weatherData,"AT" , "mn")} color="#33ff33" style={{ strokeWidth: 0.5 }} strokeDasharray="5, 3"/>
          <LineSeries data={GetData(weatherData,"AT" , "mx")} color="#33ff33" style={{ strokeWidth: 0.5 }} strokeDasharray="2, 2" /> */}
          </XYPlot>
        </div>        
      </div>
    );
  }
}