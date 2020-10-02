import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";


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
                <h1>{photoData.title}</h1>
                <p className="date">{photoData.date}</p>
                <p className="explanation">{photoData.explanation}</p>
            </div>
        </div>
        </>
    );
}