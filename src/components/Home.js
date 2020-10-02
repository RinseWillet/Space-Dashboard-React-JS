import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">            
            <Link className="home-link" to="/menu">Let's explore the final frontier</Link>
        </div>
    );
}