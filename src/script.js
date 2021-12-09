const mainDiv = document.querySelector("#root");
const searchDiv = mainDiv.querySelector("#search");
const resultDiv = mainDiv.querySelector("#result");

const result1 = document.getElementById("result1");

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

const moreResult = document.getElementById("moreresult");
const lessResult = document.getElementById("lessresult");
const moreLess = document.getElementById('moreless');

let resultDivForcast = document.createElement("div");

let open = false;
let errorC = true;

const apiKey = "88013528b8f266e96b49b381e4b09d21";

let objWeather = undefined;

//Funtions

//Future Forecast 4 days
function forecast() {
  resultDivForcast.classList.remove("animate__animated", "animate__fadeOutDown");
  setTimeout(() => {
    moreResult.hidden = true;
    lessResult.hidden = false;
    lessResult.classList.add("animate__animated", "animate__fadeInRight");
  }, 500);

  resultDiv.classList.add("forecast");
  result1.style.width = "190px";

  let forcastArray = [6, 14, 22];
  forcastArray.forEach((item) => {

    let fragment  = document.createElement('div')

    const h2 = document.createElement("h2");
    fragment.append(h2);
    const h3 = document.createElement("h3");
    fragment.append(h3);
    const resDiv = document.createElement("div");
    const imgDiv = document.createElement("img");
    resDiv.append(imgDiv);
    fragment.append(resDiv);
    const p = document.createElement("p");
    fragment.append(p);

    h2.innerHTML = `${objWeather.list[item].dt_txt.split(" ")[0]}`;
    h3.innerHTML = `${parseInt(
      objWeather.list[item].main.temp - 273.15
    )}<sup class="temp">°C</sup>`;
    imgDiv.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${objWeather.list[item].weather[0].icon}.png`
    );
    p.innerHTML = objWeather.list[item].weather[0].description;
 
    setTimeout(() => {
      resultDivForcast.append(fragment);
      resultDivForcast.classList.add('resultDivforcast');
      resultDiv.append(resultDivForcast);
    }, 100);

  });

}

//less result
function lessforecast(){
  result1.style.width = "100%";
  resultDiv.classList.remove("forecast");
    lessResult.hidden = true;
  
  resultDiv.classList.add('inputlessforecast');
  moreResult.hidden = false;
  setTimeout(()=> {
    resultDivForcast.classList.add("animate__animated", "animate__fadeOutDown");
    resultDivForcast.innerHTML = ''
  },100);
}
//Results
function outputResult() {
  resultDiv.style.display = 'flex';
  moreLess.hidden = false;
  if(open === false){
    moreResult.hidden = false;
    moreResult.classList.add("animate__animated", "animate__fadeInRight");
    open = true;
  }
  else{
    resultDivForcast.innerHTML = '';
    forecast();
    open = false;
  }

  weatherLoader.hidden = false;
  resultDiv.classList.add("resultDiv");
  resultDiv.classList.add("animate__animated", "animate__fadeInUp");
  cityName.innerHTML = `${objWeather.city.name}<sup class="country">${objWeather.city.country}</sup>`;
  cityTemp.innerHTML = `${parseInt(
    objWeather.list[0].main.temp - 273.15
  )}<sup class="temp">°C</sup>`;
  cityDiscription.innerHTML = objWeather.list[0].weather[0].description;
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${objWeather.list[0].weather[0].icon}.png`
  );
  divImg.append(img);
  loader.hidden = true;
  weatherLoader.hidden = true;
}
//---------------------------------------------

// Button
function getCityName() {
  loader.hidden = false;
  mainDiv.hidden = true;
  let inputValue = input.value;
  let apiUrlforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`;
  getWeather(apiUrlforecast);
}

//future forecast
moreResult.addEventListener("click", () => forecast());

//less result
lessResult.addEventListener('click' , () => lessforecast());

// Get Weather
async function getWeather(apiUrlforecast) {
  try {
    if(errorC === false){
      errorC = true;
    }
    let response = await fetch(apiUrlforecast);
    objWeather = await response.json();
    console.log(objWeather);
    outputResult();
  } catch (error) {
    //Alert Error
    if(errorC === true){
      resultDiv.style.display = 'none';
      moreLess.hidden = true;
    }  
    alert(`Please check your City name - "${input.value}"`);
    weatherLoader.hidden = false;
    loader.hidden = true;  
    return;
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
