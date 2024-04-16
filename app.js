import React, { useState } from 'react';

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=API_Key_Here&units=metric`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div>
            <h1>Weather Forecast App</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default App;
