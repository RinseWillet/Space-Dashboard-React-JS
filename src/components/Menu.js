import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="menu">
            <div className="button1">
            <Link className="home-link" to="/nasaphoto">NASA - Daily Photo</Link>
            </div>
            <div className="button2">
            <Link className="home-link" to="/isstracker">Track ISS</Link>
            </div>
            <div className="button3">
            <Link className="home-link" to="/marsweather">Weather report on Mars</Link>
            </div>
        </div>
    );
}
