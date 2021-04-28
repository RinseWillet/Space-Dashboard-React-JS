import React from "react";
import NavBar from "./NavBar";
import ISSMap from "./ISSMap";

//container for ISS tracker
export default function ISSTracker() {
return(
<>
            <NavBar />
            <div className="iss-container" >
                <div className="iss-title">
                <h1>Tracking International Space Station</h1>
                </div>                               
                <div>                
                <ISSMap />
                </div>
                
            </div>
            
            </>
);
}