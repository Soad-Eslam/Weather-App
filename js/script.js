const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const apiKey = "6568af6d4df24994805195421250905";

function getDayName(dateString) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString); // e.g. "2025-05-11"
  return days[date.getDay()];
}

async function getWeather(city) {
  var req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
  );
  var data = await req.json();
  console.log(data);
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = `
         <div class="today forecast col-md-4">
              <div class="forecast-header d-flex justify-content-between">
                <div class="day">${getDayName(
                  data.location.localtime.split(" ").slice(0, 1)
                )}</div>
                <div class="date">${new Date(
                  data.location.localtime.split(" ")[0]
                ).getDate()}${new Date(
    data.location.localtime.split(" ")[0]
  ).toLocaleString("en-US", { month: "short" })}</div>
              </div>
              <div class="forecast-content ms-2">
                <div class="degree">
                  <div class="location">${data.location.name}</div>
                  <div class="num d-flex">
                    ${data.current.temp_c} <sub>o</sub>C
                    <div class="forecast-icon">
                      <img src="https:${data.current.condition.icon}" alt="" />
                    </div>
                  </div>
                  <div class="custom mt-4">${data.current.condition.text}</div>
                  <span class=""
                    ><img
                      class="me-2"
                      src="images/icon-umberella.png"
                      alt=""
                    />20%</span
                  >
                  <span class=""
                    ><img
                      class="me-2"
                      src="images/icon-wind.png"
                      alt=""
                    />18km/h</span
                  >
                  <span class=""
                    ><img
                      class="me-2"
                      src="images/icon-compass.png"
                      alt=""
                    />East</span
                  >
                </div>
              </div>
            </div>
            <div class="tommorow forecast col-md-4 text-center">
              <div class="forecast-header ">
                <div class="day">${getDayName(
                  data.forecast.forecastday[1].date.split(" ").slice(0, 1)
                )}</div>
              </div>
              <div class="forecast-content ms-2">
                <div class="degree">
                  <div class="forecast-icon">
                    <img src="https:${
                      data.forecast.forecastday[1].day.condition.icon
                    }" alt="" />
                  </div>
                  <div class="num d-flex justify-content-center">${
                    data.forecast.forecastday[1].day.maxtemp_c
                  } <sub>o</sub>C</div>
                  <span>${
                    data.forecast.forecastday[1].day.mintemp_c
                  }<sup>o</sup></span>
                  <div class="custom mt-4">${
                    data.forecast.forecastday[1].day.condition.text
                  }</div>
                  
                </div>
              </div>
            </div>
            <div class="after forecast col-md-4 text-center">
              <div class="forecast-header ">
                <div class="day">${getDayName(
                  data.forecast.forecastday[2].date.split(" ").slice(0, 1)
                )}</div>
              </div>
              <div class="forecast-content ms-2">
                <div class="degree">
                  <div class="forecast-icon">
                    <img src="https:${
                      data.forecast.forecastday[2].day.condition.icon
                    }" alt="" />
                  </div>
                  <div class="num d-flex justify-content-center">${
                    data.forecast.forecastday[2].day.maxtemp_c
                  } <sub>o</sub>C</div>
                  <span>${
                    data.forecast.forecastday[2].day.mintemp_c
                  }<sup>o</sup></span>
                  <div class="custom mt-4">${
                    data.forecast.forecastday[2].day.condition.text
                  }</div>
                  
                </div>
              </div>
            </div>
          
        `;
}

input.addEventListener("input", function () {
  const city = input.value.trim();
  if (city.length > 3) {
    getWeather(city);
  }
});

btn.addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
   if (city.length > 3) {
    getWeather(city);
  }
});

getWeather("cairo");
