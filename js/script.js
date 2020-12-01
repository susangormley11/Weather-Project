// Current Date
let now = new Date();
let days = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
]
let months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

search("Manila");

function updateWeather(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;

  celciusTemp = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
  document.querySelector("#condition").innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
 
}

function search(city) {
  let apiKey = "fcff38a5582d1660f112106f76c73655";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(updateWeather);
}
function submit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", submit);



//Farenheit/Celcius Conversion

function changeToFarenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celciusTemp * 9) / 5 +32);
  celciusSwap.classList.remove("active");
  farenheitSwap.classList.add("active");
}

function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
  
}

let celciusTemp = null;

let farenheitSwap = document.querySelector("#farenheit-link");
farenheitSwap.addEventListener("click", changeToFarenheit);

let celciusSwap = document.querySelector("#celcius-link");
celciusSwap.addEventListener("click", changeToCelcius);

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

