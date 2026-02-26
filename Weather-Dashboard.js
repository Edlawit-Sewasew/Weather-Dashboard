async function findWeather(city){
    const link =' https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city+ '?key=VGL5YU8X29WFANELBLGESVR8V';
    const outcomeJson = await fetch(link);
    const outcome = await outcomeJson.json();
    console.log(outcome.days[0].datetime);
    return outcome;
}
function getOutcome(outcome){
    if(outcome === null){
        console.log("There is nothing");
        return ;
    }
    else{
        return{ 
            Date:outcome.days[0].datetime,
            temprature:outcome.days[0].temp,
            feelsLike:outcome.days[0].feelslike,
            humid:outcome.days[0].humidity,
            conditions:outcome.currentConditions.conditions,
            precipitation:outcome.precip,
            precipitationChance:outcome.currentConditions.precipprob,
            windSpeed:outcome.currentConditions.windspeed,
            WeatherIcon:outcome.currentConditions.icon,
        };
    }
}
const button = document.querySelector('#searchButton');
button.addEventListener('click', async(e)=>{
e.preventDefault();
const location = document.querySelector('#locationInput').value;
const liveWeather = await findWeather(location);
const outcome = getOutcome(liveWeather);
if(outcome){
const info = document.querySelector('.weatherInfo');
info.innerHTML='<div class="weather-info-container"> <h2>Today\'s Weather</h2><div class="forecast-item">    <span class="weather-label">Date:</span> <span class="weather-value">'+ outcome.Date+ '</span> </div> <div class="forecast-item">   <span class="weather-label">Temperature:</span>    <span class="weather-value">'+outcome.temprature+'℉</span> </div> <div class="weather-image" id="weatherImage"></div> </div>';
const forecast = document.querySelector('.forecast');
forecast.innerHTML='<h3>Weather Details</h3> <div class="forecast-item">  <span class="weather-label">Humidity:</span>  <span class="weather-value">'+ outcome.humid+ '%</span>  </div>  <div class="forecast-item">    <span class="weather-label">Feels Like:</span>    <span class="weather-value">'+ outcome.feelsLike +'°F</span> </div> <div class="forecast-item">    <span class="weather-label">Wind Speed:</span>    <span class="weather-value">' + outcome.windSpeed +'mph</span>   </div>    <div class="forecast-item">    <span class="weather-label">Conditions:</span>    <span class="weather-value">'+ outcome.conditions +'</span> </div> ';
if(outcome.WeatherIcon.includes('snow')){
    info.innerHTML +="<img src='https://cdn-icons-png.flaticon.com/512/6221/6221304.png' alt='snow picture' width= '100px' height='90px'> ";
}
else if(outcome.WeatherIcon.includes('clear-day')){
    info.innerHTML +="<img src='https://cdn-icons-png.flaticon.com/512/7084/7084512.png' alt='sunny' width= '100px' height='90px'> ";
}
else if(outcome.WeatherIcon.includes('rain')){
    info.innerHTML +="<img src='https://cdn-icons-png.flaticon.com/512/1163/1163657.png' alt = 'rain' width= '100px' height='90px'> ";
}
else if(outcome.WeatherIcon.includes('wind')){
    info.innerHTML +="<img src='https://cdn-icons-png.flaticon.com/512/966/966390.png' alt='wind weather' width= '100px' height='90px' >";
}
else if(outcome.WeatherIcon.includes('partly-cloudy-day')){
    info.innerHTML +="<img src=' https://cdn-icons-png.flaticon.com/512/4834/4834559.png' alt='cloudy weather' width= '100px' height='90px'>";
}
else if(outcome.WeatherIcon.includes('partly-cloudy-night')){
info.innerHTML +="<img src='https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clouds-night-icon.png' alt='Cloudy night' width='100px' height='90px'> ";
}
else{
    console.log('other weather');
}
}
else{
    console.log("Error");
}
});
