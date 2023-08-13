const locationNow = document.getElementById("location");
const day1 = document.getElementById("day1");

const date1 = document.getElementById("date1");
const tempToday = document.getElementById("temp-today");
const iconToday = document.getElementById("icon-today");
const todayWeatherStatue = document.getElementById("wheather-statue-today");
const humidityToday = document.getElementById("humidity");
const windSpeedToday = document.getElementById("wind-speed");
const windDirection = document.getElementById("wind-dir");
//////////////////////////////////////////////////////////////////////////////!
const iconCondition = document.querySelectorAll(".cont img");
const tempHigh = document.querySelectorAll(".temp-up");
const tempLow = document.querySelectorAll(".temp-down");
const nextWeatherStatue = document.querySelectorAll(".statue");
const nextDays = document.querySelectorAll(".next-days");

let searchInput = document.getElementById("searchInput");

async function getApi(loc) {
  let apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=84789a2ca2e844ddbaa190024231308&q=${loc}&days=3`
  );
  let dataApi = await apiResponse.json();
  return dataApi;
}

function getDataToday(data) {
  let date = new Date();

  day1.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
  date1.innerHTML =
    date.getDate() + " " + date.toLocaleDateString("en-US", { month: "long" });
  locationNow.innerHTML = data.location.name;
  tempToday.innerHTML = data.current.temp_c;
  todayWeatherStatue.innerHTML = data.current.condition.text;
  iconToday.setAttribute("src", data.current.condition.icon);
  windSpeedToday.innerHTML = data.current.wind_kph;
  humidityToday.innerHTML = data.current.humidity + "%";
  windDirection.innerHTML = data.current.wind_dir;
}

function getNextDay(data) {
  let forecastData = data.forecast.forecastday;

  for (let i = 0; i < 2; i++) {
    iconCondition[i].setAttribute(
      "src",
      forecastData[i + 1].day.condition.icon
    );

    tempHigh[i].innerHTML = forecastData[i + 1].day.maxtemp_c;

    tempLow[i].innerHTML = forecastData[i + 1].day.mintemp_c;

    nextWeatherStatue[i].innerHTML = forecastData[i + 1].day.condition.text;

    let nextDate = new Date(forecastData[i + 1].date);

    console.log(nextDate);

    nextDays[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }
}
searchInput.addEventListener("input", function () {
  doAll(searchInput.value);
});

async function doAll(cityName = "cairo") {
  let dataApi = await getApi(cityName);
  if(!dataApi.error){
  getDataToday(dataApi);
  getNextDay(dataApi);}
}
doAll();
