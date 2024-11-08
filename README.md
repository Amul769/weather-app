 # Weather Application

This application displays current weather, air quality, and a 5-day forecast for a specified location. It fetches data from the OpenWeatherMap API.

## Prerequisites

- Web Browser (to run the application locally)
- Internet connection (to fetch data from OpenWeatherMap)

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone (https://github.com/Amul769/weather-app)
   cd yourrepository
2. Get Your OpenWeatherMap API Key

To use this application, you need an API key from OpenWeatherMap. Follow these steps to obtain one:

Go to OpenWeatherMap and create a free account if you don’t have one.
After logging in, navigate to the API keys section in your account settings.
Create a new API key (or use the default one provided) and copy it

3.Set Up the API Key
Open the script.js file located in the project directory.
Find the line where api_key is defined:
javascript
let api_key = 'fc423b894bdc913542805eb04ca984a1';

4.Run the Application
Open index.html in your preferred web browser.
Enter the city name and click Search to get the weather details, or click Current Location to use your location.

Application Overview
index.html: The main HTML file that structures the webpage.
script.js: Contains JavaScript functions for fetching data from the OpenWeatherMap API and displaying it on the webpage.
style.css: Defines the styling and layout for the application interface.

Features
Current Weather: Shows the current temperature, weather conditions, and location details.
5-Day Forecast: Provides a daily forecast for the next 5 days.
Air Quality Index: Displays the air quality index and levels of various pollutants.
Other Weather Metrics: Includes data on humidity, pressure, visibility, wind speed, sunrise, and sunset times.

Troubleshooting
Ensure the API key is correct and active.
If location access is denied, grant location permission in your browser settings.
