import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

var text="Let's explore the final frontier"

export default function Home() {
    return (
        <div className="home">            
            <Link className="home-link" to="/menu">
            <Typewriter
                            options={{
                                delay: 45
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString(text)
                                    .pauseFor(200)
                                    .callFunction(() => {
                                        console.log("String typed out!");
                                    })
                                    .start();
                            }}
                        />
                </Link>
        </div>
    );
}