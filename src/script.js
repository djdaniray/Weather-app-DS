//setting date

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let liDay = document.querySelector("li.current-day");
let liDate = document.querySelector("#current-date");
let liTime = document.querySelector("#current-time");
liDate.innerHTML = ` ${month} ${date}, ${year}`;
liTime.innerHTML = `Last updated ${hour}:${minutes}`;
liDay.innerHTML = `${day}`;

function formatHours(timestamp) {
  return `${hour}:00`;
}

//Current weather for Atlanta
function temperature(response) {
  let currentTemp = document.querySelector("#temp");
  let minTemp = document.querySelector("#im-hi-lo");
  let icon = document.querySelector("#icon");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  minTemp.innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F | Lo ${Math.round(response.data.main.temp_min)}°F`;

  document.querySelector("#descrip").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
}

//Search Bar city
function showTemp(response) {
  let currentTemp = document.querySelector("#temp");
  let minTemp = document.querySelector("#im-hi-lo");
  let icon = document.querySelector("#icon");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  minTemp.innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )} | Lo ${Math.round(response.data.main.temp_min)}`;
  document.querySelector("#descrip").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
}

function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input-value");
  let apiKey = "037d9b04c685370b3f28aaa4b1482345";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=imperial`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Currently ${cityName.value}`;
  celsciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  axios.get(apiUrl).then(showTemp);
}

// Clicking F and C temperatures

function showCelscius(response) {
  let celsciusTemp = document.querySelector("#temp");
  let dayTemp = document.querySelector("#im-hi-lo");
  let windElement = document.querySelector("#wind");

  celsciusTemp.innerHTML = Math.round(response.data.main.temp);
  dayTemp.innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°C | Lo ${Math.round(response.data.main.temp_min)}°C`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function getCelscius(event) {
  event.preventDefault();

  let apiUrlMetric = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlMetric).then(showCelscius);
  celsciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
function showFahrenheit(response) {
  console.log(response.data);
  let h3 = document.querySelector("#temp");
  let dayTemp = document.querySelector("#im-hi-lo");
  let windElement = document.querySelector("#wind");
  h3.innerHTML = Math.round(response.data.main.temp);
  dayTemp.innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F | Lo ${Math.round(response.data.main.temp_min)}°F`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
}
function getFahrenheit(event) {
  event.preventDefault();
  axios.get(apiUrl).then(showFahrenheit);
  celsciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsciusLink = document.querySelector("#metric");
let fahrenheitLink = document.querySelector("#imperial");
celsciusLink.addEventListener("click", getCelscius);
fahrenheitLink.addEventListener("click", getFahrenheit);

//Current location button
function btnTemp(position) {
  let city = document.querySelector("h1");
  let btn = document.querySelector("#temp");
  let minTemp = document.querySelector("#im-hi-lo");
  let descriptionElement = document.querySelector("#descrip");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  city.innerHTML = `Currently ${position.data.name}`;
  btn.innerHTML = `${Math.round(position.data.main.temp)}`;
  minTemp.innerHTML = `Hi ${Math.round(
    position.data.main.temp_max
  )}°F | Lo ${Math.round(position.data.main.temp_min)}°F`;
  descriptionElement.innerHTML = position.data.weather[0].description;
  humidityElement.innerHTML = position.data.main.humidity;
  windElement.innerHTML = `${Math.round(position.data.wind.speed)} mph`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${position.data.weather[0].description}`);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "037d9b04c685370b3f28aaa4b1482345";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(btnTemp);
  axios.get(apiUrl).then(showForecast);
}

function currentLocationBtn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

//forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML = forecastElement.innerHTML += `<div class="col-2">
      <h5> ${formatHours(forecast.dt * 1000)} </h5>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" />
      <div class= "high-temp">
      <strong>${Math.round(forecast.main.temp_max)}° </strong > ${Math.round(
      forecast.main.temp_min
    )}°
      </div>
      </div>
      `;
  }
}
let currentCity = "Atlanta";
let apiKey = "037d9b04c685370b3f28aaa4b1482345";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(temperature);
let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=imperial`;
axios.get(apiUrlForecast).then(showForecast);

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", citySearch);

let button = document.querySelector("#current-location");
button.addEventListener("click", currentLocationBtn);
