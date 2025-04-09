const apiKey = 'd7d930c82c090484b16633d25ea9b927';  // Replace with your OpenWeather API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    errorMessage.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
      errorMessage.textContent = 'City not found.';
      return;
    }

    errorMessage.textContent = '';
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  } catch (error) {
    errorMessage.textContent = 'Error fetching weather data.';
  }
}
