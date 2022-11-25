const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=cded6f537699a9255014448e880c15a8";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value || "Toronto";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      const status = Object.assign({}, ...res.data.weather);

      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + "°C";
      humidity.textContent = hum + "%";
      weather.textContent = status.main;

      warning.textContent = "";
      input.value = "";

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute("src", "./assets/images/thunderstorm.png");
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute("src", "./assets/images/drizzle.png");
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute("src", "./assets/images/rain.png");
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute("src", "./assets/images/ice.png");
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute("src", "./assets/images/fog.png");
      } else if (status.id === 800) {
        photo.setAttribute("src", "./assets/images/sun.png");
      } else if (status.id > 800 && status.id < 900) {
        photo.setAttribute("src", "./assets/images/cloud.png");
      } else {
        photo.setAttribute("src", "./assets/images/unknown.png");
      }
    })
    .catch(() => (warning.textContent = "Please enter a valid city name!"));
};

const enterCheck = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};

input.addEventListener("keyup", enterCheck);
button.addEventListener("click", getWeather);
getWeather();
