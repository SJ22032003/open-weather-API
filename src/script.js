const mainDiv = document.querySelector("#root");
const searchDiv = mainDiv.querySelector("#search");
const resultDiv = mainDiv.querySelector("#result");

const input = searchDiv.querySelector("input");
const button = searchDiv.querySelector("button");

const head = document.querySelector("#head");

const loader = document.querySelector("#loader");
const weatherLoader = document.querySelector("#weather-loader");

const cityName = resultDiv.querySelector("h1");
const cityTemp = resultDiv.querySelector("h3");
const cityDiscription = resultDiv.querySelector("p");

const divImg = document.querySelector("#weather-img");
const img = document.createElement("img");

const apiKey = "88013528b8f266e96b49b381e4b09d21";

let objWeather = undefined;

//Funtions

//Results
function outputResult() {
  resultDiv.style.display='block';
  weatherLoader.hidden = false;
  resultDiv.classList.add("resultDiv");
  resultDiv.classList.add("animate__animated", "animate__fadeInUp");
  cityName.innerHTML = `${objWeather.name}<sup class="country">${objWeather.sys.country}</sup>`;
  cityTemp.innerHTML = `${parseInt(
    objWeather.main.temp - 273.15
  )}<sup class="temp">°C</sup>`;
  cityTemp.classList.add("animate__animated", "animate__fadeInUp");
  cityDiscription.innerHTML = objWeather.weather[0].description;
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${objWeather.weather[0].icon}.png`
  );
  divImg.append(img);
  divImg.classList.add("animate__animated", "animate__fadeInUp");
  loader.hidden = true;
  weatherLoader.hidden = true;
}

// Button
function getCityName() {
  loader.hidden = false;
  mainDiv.hidden = true;
  let inputValue = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
  getWeather(apiUrl);
}

// Get Weather
async function getWeather(apiUrl) {
  try {
    let response = await fetch(apiUrl);
    objWeather = await response.json();
    console.log(objWeather);
    outputResult();
  } catch (error) {
    //Alert Error
    resultDiv.style.display= 'none';
    alert(`Please check your City name - "${input.value}"`);
    weatherLoader.hidden = false;
    loader.hidden = true;
  }
}

//Button
button.addEventListener("click", getCityName);

window.onload = function () {
  loader.hidden = false;
  setTimeout(() => {
    loader.hidden = true;
  }, 2000);
};
