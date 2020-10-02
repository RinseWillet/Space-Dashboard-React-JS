import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import NavBar from "./NavBar";
import LeafletMap from "./LeafletMap";

//API key NASA and Google Maps from .env file in root
const apiKey = process.env.REACT_APP_KEY;

function renderTable(weatherData, index) {

    let sol_keys = weatherData.sol_keys;


    try {
        var earthDateRaw = new Date(weatherData[sol_keys[index]].First_UTC);
        var earthDate = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "2-digit" }).format(earthDateRaw);
    } catch (e) {
        earthDate = "no data";
    }

    try {
        var solDay = sol_keys[index];
    } catch (e) {
        var SolDay = "no data";
    }

    try {
        var averageTempCelsius = Math.round(weatherData[sol_keys[index]].AT.av * 10) / 10;
    } catch (e) {
        var averageTempCelsius = "no data";
    }

    try {
        var windVelocity = Math.round(weatherData[sol_keys[index]].HWS.av * 10) / 10;
    } catch (e) {
        var windVelocity = "no data";
    }

    try {
        var atmosphericPressure = Math.round(weatherData[sol_keys[index]].PRE.av * 10) / 10;
    } catch (e) {
        var atmosphericPressure = "no data";
    }

    return (
        <tr>
            <td>{earthDate}</td>
            <td>{solDay}</td>
            <td>{averageTempCelsius}</td>
            <td>{windVelocity}</td>
            <td>{atmosphericPressure}</td>
        </tr>
    );

}

export default function MarsWeather() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchData();

        async function fetchData() {
            const res = await fetch(
                //create your own NASA api key at : https://api.nasa.gov/ - my personal key was not pushed to github
                `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`
            );
            const data = await res.json();
            setWeatherData(data);
        }
    }, []);

    if (!weatherData) return <div />;
    const sol_keys = weatherData.sol_keys;

    return (
        <>
            <NavBar />
            <div className="nasa-weather-table">
                <table className="table-border">
                    <thead >
                        <tr className="table-header">
                            <th>Earth date</th>
                            <th>Sol day</th>
                            <th>Average temperature (°C)</th>
                            <th>Average wind velocity (m/s)</th>
                            <th>Average atmospheric pressure (Pa)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable(weatherData, (sol_keys.length - 1))}
                        {renderTable(weatherData, (sol_keys.length - 2))}
                        {renderTable(weatherData, (sol_keys.length - 3))}
                        {renderTable(weatherData, (sol_keys.length - 4))}
                        {renderTable(weatherData, (sol_keys.length - 5))}
                        {renderTable(weatherData, (sol_keys.length - 6))}
                        {renderTable(weatherData, (sol_keys.length - 7))}
                    </tbody>
                </table>
            </div>
            <div className="nasa-weather-map">
                <div className="nasa-weather-text">
                    <h2>WEATHER REPORT FROM ELYSIUM PLANITIA</h2>
                    <p>The data from NASA's Mars InSight Mission is used here to give an updated report on the weather at Mars.
                    Elysium Planitia is a flat and smooth plain close to Mars' equator. The table represents the averages in  (degrees Celsius),
                    windspeed (meters per second), and atmospheric pressure (Pascal) of the last seven Sol Days (length 24 hrs and 37 min)
                    of the Martian Year (687 days). The satellite map indicates the current position of the probe. In the graph below the daily temperature, windspeed and atmospheric presure trends can be plotted (average, minimum, maximum values).</p>
                </div>
                <div className="nasa-weather-box" id='map'>
                    <div>
                        <LeafletMap />
                    </div>
                </div>
            </div>
            <div>
                <Graph />
            </div>       
        </>
    );
}