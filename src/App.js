import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import NasaPhoto from "./components/NasaPhoto";
import Menu from "./components/Menu";
import MarsWeather from "./components/MarsWeather";
import ISSTracker from "./components/ISSTracker";

import './App.css';

export default function App() {
  return(
    <BrowserRouter>
      <div className="app">
        <Route component={Home} path="/" exact />
        <Route component={NasaPhoto} path="/nasaphoto" />
        <Route component={Menu} path="/menu" />
        <Route component={MarsWeather} path="/marsweather" />
        <Route component={ISSTracker} path="/isstracker" />
      </div>

    </BrowserRouter>
  );
}
