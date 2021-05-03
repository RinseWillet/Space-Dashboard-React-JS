import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="menu">
            <div className="button1">
            <Link className="home-link anim-typewriter" to="/nasaphoto">NASA - Daily Photo</Link>
            </div>
            <div className="button2">
            <Link className="home-link" to="/isstracker">Track ISS</Link>
            </div>
            <div className="button3">
            <Link className="home-link" to="/marsweather">Weather report on Mars</Link>
            </div>
            {/* <div className="button4">
            <Link className="home-link" to="/nasarss">NASA RSS</Link>
            </div>
            <div className="button5">
            <Link className="home-link" to="/about">About</Link>
            </div> */}
        </div>
    );
}
