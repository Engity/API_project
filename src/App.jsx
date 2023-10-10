import { useState, useLayoutEffect, useRef } from 'react'
import './App.css'
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY
// const API_KEY = "uYhfhgGcKQgggSBqRT0J9PB2o2KeCvyH9OQTSzXY";

function App() {
    const [imageInfo, setImageInfo] = useState('')
    useLayoutEffect(() => {
        axios.get('https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&count=1').then(
            (response) => {
                console.log(response.data[0]);
                setImageInfo(response.data[0]);
                console.log(imageInfo.url)
            }
        );
    }, []);

    return (
        <div className="App">
            <div>
                <img src={imageInfo.url} />
            </div>


        </div>
    )
}

export default App
