// Current Date
let now = new Date();
let days = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
]
let months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
]

let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${date} ${month} ${year}`;

// Current Time
let hours = now.getHours();
if (hours <10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes <10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

// City Search

function updateWeather(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#condition").innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function search(event) {
  event.preventDefault();
  let apiKey = "fcff38a5582d1660f112106f76c73655";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(updateWeather);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("click", search);

//Farenheit Conversion
function changeToFarenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 +32);
  let unit = document.querySelector("#unit");
  unit.innerHTML = "℉";
}

let farenheitSwap = document.querySelector("#farenheit-link");
farenheitSwap.addEventListener("click", changeToFarenheit);

// API



// Get Current Location Button

function showLocationTemperature(response) {
let temperature = Math.round(response.data.main.temp);
let h2 = document.querySelector("h2");
h2.innerHTML = `${temperature}`;
}

function handlePosition(position) {
  
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "fcff38a5582d1660f112106f76c73655";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocationTemperature);
}

function getCurrentPosition(position) {
navigator.geolocation.getCurrentPosition(handlePosition)
}

let currentPositionButton = document.querySelector("button");
currentPositionButton.addEventListener("click", getCurrentPosition);

//

