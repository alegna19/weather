//Show the Current Date:

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayCurrent = daysOfWeek[day];
  return `${dayCurrent} ${hours}:${minutes}`;
}

let dateWeather = document.querySelector("#date");
let currenTime = new Date();
dateWeather.innerHTML = formatDate(currenTime);


//Show the current temperature by country.

function showTemperature(response) {

  let tempValue = Math.round(response.data.main.temp);
  let humidityValue = Math.round(response.data.main.humidity);
  let windValue = Math.round(response.data.wind.speed);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${tempValue}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityValue}%`
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windValue}mph`;

}

function searchCity(event) {

  event.preventDefault();
  let cityValue = document.querySelector("#city");
  let inputCity = document.querySelector("#input-city");
  cityValue.innerHTML = inputCity.value;

  let apiKey = "a47fcb32fa31c2cf0799e4cfc995447f"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let inputCityForm = document.querySelector("#form");
inputCityForm.addEventListener("submit", searchCity)


//Show the current Location

function showCountry(response) {
  let country = response.data.list[1].sys.country;
  let temp = Math.round(response.data.list[1].main.temp);
  let humidityElement = response.data.list[1].main.humidity;
  let windElement = Math.round(response.data.list[1].wind.speed);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityElement}%`
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windElement}mph`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = country;

}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a47fcb32fa31c2cf0799e4cfc995447f"
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/find"
  let urlApiCoords = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlApiCoords).then(showCountry);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentElement = document.querySelector("#current-element");
currentElement.addEventListener("click", showCurrentLocation);