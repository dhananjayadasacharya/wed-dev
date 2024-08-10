const apiKey = '093c16be5b547e1b18120f5d7f0d5b17'; // Replace with your weather API key
const weatherElement = document.getElementById('weather');
const locationElement = document.getElementById('location');

// Get user's location using the Geolocation API
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

    // Fetch weather data from the API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            
            
            weatherElement.innerHTML = `Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
        })
        .catch(() => {
            weatherElement.textContent = 'Failed to fetch weather data.';
        });
}

function error() {
    locationElement.textContent = 'Unable to retrieve your location';
    weatherElement.textContent = 'Unable to fetch weather without location.';
}
