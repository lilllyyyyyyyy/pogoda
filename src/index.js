function displayForecast () {
    let forecast = document.querySelector("#forecast"); 

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; 
    let forecastHtml = ""; 

    days.forEach(function(day) {
    forecastHtml = forecastHtml + `
    <div class="row">
        <div class="col-2"> 
            <div class="date"> ${day} </div>
                <br />
                    <img src="https://cdn-icons-png.freepik.com/512/3937/3937493.png" width="30px" />
                       <div class="forecast-temperature">
                          <span class="max">18°</span> 
                        <span class="min">12°</span> 
                    </div>
                </div>
            </div>
            `; 
        })

        forecast.innerHTML = forecastHtml; 
    }

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature =  response.data.temperature.current; 
    let cityElement = document.querySelector ("#city"); 
    let descriptionElement = document.querySelector("#description"); 
    let humidityElement = document.querySelector("#humidity"); 
    let speedElement = document.querySelector("#speed"); 
    let timeElement = document.querySelector("#time"); 
    let date = new Date (response.data.time * 1000); 
    let iconElement = document.querySelector("#icon"); 
    

    cityElement.innerHTML = response.data.city; 
    descriptionElement.innerHTML = response.data.condition.description; 
    humidityElement.innerHTML = `${ response.data.temperature.humidity}%`; 
    speedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date); 
    temperatureElement.innerHTML = Math.round(temperature); 
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"/>`; 

}
function formatDate(date) {
    let minutes = date.getMinutes(); 
    let hours = date.getHours(); 
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]; 
    let day = days[date.getDay()]; 

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes},`; 


}


function findCity (city) {
let apiKey = "cbo0a3600dd137f25t841c455a60aebf"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(refreshWeather); 
}


function searchCity (event) {
    event.preventDefault ();
    let searchInput = document.querySelector("#search-form-input"); 
    findCity(searchInput.value); 


}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);

findCity("Rzeszów");
displayForecast(); 
