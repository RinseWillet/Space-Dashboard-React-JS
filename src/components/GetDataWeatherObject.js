
//function for creating array with x, y values for graph from JSON body received from NASA API
export default function GetData(weatherData, type, unit) {

  //empty array to store the x-y values obtained from JSON object weatherData into
  const graphData = [];

  //the array of solar days obtained from the JSON object, normally 7 units. These form the fundamental x values
  var sol_keys = weatherData.sol_keys;

  //obtaining temperature, windspeed, pressure values (min, max, average) from JSON body 
  try {
    for (let i = 0; i < sol_keys.length; i++) {
      graphData.push({ x: sol_keys[i], y: weatherData[sol_keys[i]].[type].[unit] })
    }
  } catch (e) {
    console.log("error - data not yet loaded");
  }
  return graphData;
}