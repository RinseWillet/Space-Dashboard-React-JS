import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Typewriter from "typewriter-effect";


//API key NASA from .env file in root
const apiKey = process.env.REACT_APP_KEY;

//function to download daily photo from NASA
export default function NasaPhoto() {
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(
                //create your own NASA api key at : https://api.nasa.gov/ - my personal key was not pushed to github
                `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
            );
            const data = await res.json();
            setPhotoData(data);
            console.log(data);
        }
    }, []);

    if (!photoData) return <div />;
    var title = photoData.title;
    var date = photoData.date;
    var explanation = photoData.explanation;

    var text = '<h1>' + title + '</h1><p class="date">' + date + '</p><p class="explanation">' + explanation + '</p>'

    return (
        <>
            <NavBar />
            <div className="nasa-photo">
                {photoData.media_type === "image" ? (
                    <img src={photoData.url}
                        alt={photoData.title}
                        className="photo"
                    />
                ) : (
                    <iframe title="space-video"
                        src={photoData.url}
                        frameBorder="0"
                        gesture="media"
                        allow="encrypted-media"
                        allowFullScreen
                        className="photo"
                    />

                )}

                <div>
                    <div className="nasa-photo-text">
                        <Typewriter
                            options={{
                                delay: 5
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
                    </div>
                </div>
            </div>
        </>
    );
}