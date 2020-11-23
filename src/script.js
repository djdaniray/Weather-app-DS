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
let liDate = document.querySelector("#current-date");
let liTime = document.querySelector("#current-time");
liDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
liTime.innerHTML = `${hour}:${minutes}`;

function currently(response) {
  let cTemp = document.querySelector("#temp");
  let minTemp = document.querySelector("#im-hi-lo");
  cTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  minTemp.innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F | Lo ${Math.round(response.data.main.temp_min)}°F`;
}

let currentCity = "Atlanta";
let apiKey = "037d9b04c685370b3f28aaa4b1482345";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(currently);

function showTemp(response) {
  let cTemp = document.querySelector("#temp");
  let minTemp = document.querySelector("#im-hi-lo");
  cTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  minTemp.innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F | Lo ${Math.round(response.data.main.temp_min)}°F`;
}

function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input-value");
  let h1 = document.querySelector("h1");
  let p = document.querySelector("#forecast");
  let apiKey = "037d9b04c685370b3f28aaa4b1482345";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=imperial`;
  h1.innerHTML = `Currently in ${cityName.value}`;
  p.innerHTML = `Next Five Days in ${cityName.value}`;

  axios.get(apiUrl).then(showTemp);
}
let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", citySearch);

function getCelscius(event) {
  event.preventDefault();
  let h3 = document.querySelector("#temp");
  let dayTemp = document.querySelector("#im-hi-lo");
  h3.innerHTML = `25`;
  dayTemp.innerHTML = `Hi 27°C | Lo 18°C`;
}

function getFahrenheit(event) {
  event.preventDefault();
  let h3 = document.querySelector("#temp");
  let dayTemp = document.querySelector("#im-hi-lo");
  h3.innerHTML = `77`;
  dayTemp.innerHTML = `Hi 80°F | Lo 65°F`;
}

let celscius = document.querySelector("#metric");
let fahrenheit = document.querySelector("#imperial");
celscius.addEventListener("click", getCelscius);
fahrenheit.addEventListener("click", getFahrenheit);

function btnTemp(position) {
  let city = document.querySelector("h1");
  let forecast = document.querySelector("#forecast");
  let btn = document.querySelector("#temp");
  let minTemp = document.querySelector("#im-hi-lo");

  city.innerHTML = `Currently in ${position.data.name}`;
  forecast.innerHTML = `Next Five Days in ${position.data.name}`;
  btn.innerHTML = `${Math.round(position.data.main.temp)}`;
  minTemp.innerHTML = `Hi ${Math.round(
    position.data.main.temp_max
  )}°F | Lo ${Math.round(position.data.main.temp_min)}°F`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "037d9b04c685370b3f28aaa4b1482345";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(btnTemp);
}

function currentLocationBtn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", currentLocationBtn);
