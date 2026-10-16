// WeatherAPI key and page elements
const apiKey = "c56b4729248348d49b431340261610";
const locationSelect = document.querySelector("#location");
const weatherResult = document.querySelector("#weather-result");

// Get the current weather for the selected city
function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  weatherResult.innerHTML = "<p>Loading weather...</p>";

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Weather information could not be loaded.");
      }

      return response.json();
    })
    .then(function (data) {
      weatherResult.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p class="temperature">${data.current.temp_c}&deg;C</p>
        <p class="condition">${data.current.condition.text}</p>
      `;
    })
    .catch(function (error) {
      weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

// Change the API location when the user changes the dropdown
locationSelect.addEventListener("change", function () {
  getWeather(locationSelect.value);
});

// Show Toronto weather when the page first opens
getWeather(locationSelect.value);
