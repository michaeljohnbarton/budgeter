/*
This is just a very basic example of how to make an API call in React based on a Copilot response
*/

import React, { useState, useEffect } from 'react';

export default function Square() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const apiUrl = 'https://localhost:7235/WeatherForecast'; // Replace with your API URL

    useEffect(() => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => setError(error));
    }, []); // Empty dependency array means this runs once on component mount

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button className="square">X</button>
            <h1>Data from C# API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}