let cityInput=document.getElementById('city_input'),
searchbtn=document.getElementById('searchbtn'),
locationbtn=document.getElementById('locationbtn'),
api_key= 'fc423b894bdc913542805eb04ca984a1';
currentweathercard= document.querySelectorAll('.weather-left .card')[0];
fiveDaysForecastcard=document.querySelector('.day-forecast');
aqiCard =document.querySelectorAll('.highligths .card')[0];
sunriseCard =document.querySelectorAll('.highligths .card')[1];
humidityval=document.getElementById('humidityval'),
Pressureval=document.getElementById('Pressureval'),
visibilitval=document.getElementById('visibilitval'),
windspeedval=document.getElementById('windspeedval'),
feelsval=document.getElementById('feelsval'),
hourlyForecastCard=document.querySelector('.hourly-forecast'),
aqiList=['Good','Fair','Moderate','Poor', 'very Poor'];


function  getweatherDetails(name, lat, lon, country, state){
    let FORECAST_API_URl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLLUTION_API_URl=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
    
    days=[
        'sunday',
        'Monday',
        'Tuseday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months=[
        'jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    fetch(AIR_POLLUTION_API_URl).then(res => res.json()).then(data =>{
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3 }= data.list[0].components;
       aqiCard.innerHTML=`
        <div class="card-head">
                        <p>Air Quality index</p>
                        <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi -1]}</p>
                    </div>
                    <div class="air-indices">
                        <i class="fa-regular fa-wind fa-3x"></i>
                        <div class="item">
                            <p>PM2_5</p>
                            <h2>${pm2_5}</h2>
                        </div>
                        <div class="item">
                            <p>PM10</p>
                            <h2>${pm10}</h2>
                        </div>
                        <div class="item">
                            <p>SO2</p>
                            <h2>${so2}</h2>
                        </div>
                        <div class="item">
                            <p>CO</p>
                            <h2>${co}</h2>
                        </div>
                        <div class="item">
                            <p>No</p>
                            <h2>${no}</h2>
                        </div>
                        <div class="item">
                            <p>No2</p>
                            <h2>${no2}</h2>
                        </div>
                        <div class="item">
                            <p>NH3</p>
                            <h2>${nh3}</h2>
                        </div>
                        <div class="item">
                            <p>O3</p>
                            <h2>${o3}</h2>
                        </div>
                    </div>
       `
    }).catch(()=>{
        alert(`Failed  to fetch  airquality index `)
    })

    fetch(WEATHER_API_URl).then(res => res.json()).then(data =>{
       let date= new Date();
        currentweathercard.innerHTML=`
                     <div class="current-weather">
                        </div>
                        <div class="details">
                            <p>Now</p>
                            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg:C</h2>
                            <p>${data.weather[0].description}</p>
                        </div>
                        <div class="weather-icon">
                            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                        </div>
                    </div>
                    <hr>
                    <div class="card-footer">
                        <p><i class="fa-light fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}</p>
                        <p><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
                    </div>
                    `;
                let {sunrise, sunset}= data.sys,
                 {timezone, visibility}= data,
                 {humidity,Pressure, feels_like}= data.main,
                 {speed}= data.wind,
                sRiseTtime = moment.utc(sunrise, 'X').add(timezone,'seconds').format('hh:mm A'),
                sSetTime = moment.utc(sunset, 'X').add(timezone,'seconds').format('hh:mm A');
                sunriseCard.innerHTML=`
                <div class="card-head">
                    <p>sunrse & sunset</p>
                </div>
                <div class="sunrise-sunset">
                    <div class="item">
                        <div class="icon">
                            <i class="fa-light fa-sunrise fa-4x"></i>
                        </div>
                        <div>
                            <p>Sunrise</p>
                            <h2>${sRiseTtime}</h2>
                        </div>
                      
                    </div>
                    <div class="item">
                        <div class="icon">
                            <i class="fa-light fa-sunset fa-4x"></i>
                        </div>
                        <div>
                            <p>Sunset</p>
                            <h2>${sSetTime}</h2>
                        </div>
                      
                    </div>
                </div>`;
                humidityval.innerHTML=`${humidity}%`;
                Pressureval.innerHTML=`${Pressure}hPa`;
                visibilitval.innerHTML=`${visibility/1000}km`;
                windspeedval.innerHTML=`${speed}m/s`;
                feelsval.innerHTML=`${(feels_like - 273.15).toFixed(2)}&deg;C`;
                

    }).catch(()=>{
        alert (`Failed to fetch  current weather`);
    });

    fetch(FORECAST_API_URl).then(res => res.json()).then(data => {
        let hourlyForecast=data.list;
        hourlyForecastCard.innerHTML='';
        for(i=0; i<=7; i++){
       
            let hrForecastDate= new Date(hourlyForecast[i].dt_txt);
            let hr= hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a= 'AM';
            if(hr == 0) hr= 12;
            if(hr > 12) hr= hr-12;
            hourlyForecastCard.innerHTML +=`
              <div class="card">
                    <p> ${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>  
            `;
        }
    
       let uniqueForecastDays= [];
       let fiveDaysForecast= data.list.filter(forecast => {
        let forecastDate= new Date(forecast.dt_txt).getDate();
        if(!uniqueForecastDays.includes(forecastDate)){
            return uniqueForecastDays.push(forecastDate);
        }
       });
       fiveDaysForecastcard.innerHTML ='';
       for(i = 1; i < fiveDaysForecast.length;i++){
        let date= new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastcard.innerHTML +=`
        <div class="forecast-item">
                            <div class="icon-wrapper">
                               <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt=""> 
                               <span>${(fiveDaysForecast[i].main.temp -273.15).toFixed(2)}&deg:C</span>
                            </div>
                            <p>${date.getDate()} ${months[date.getMonth()]}</p>
                            <p>${days[date.getDay()]}</p>

                        </div>
                        `;
       }
    }).catch(()=>{
        alert (`Failed to fetch  weather forecast`);
    });

}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value='';
    if(!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
       let {name, lat, lon, country, state} =data[0];
       getweatherDetails(name, lat, lon, country, state);
    }).catch(()=>{
        alert (`Failed to fetch coordinates of ${cityName}`);
    })
}


function getUsercoordinates(){
    navigator.geolocation.getCurrentPosition(position =>{
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_URL =`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
        fetch(REVERSE_GEOCODING_URL).then(res=> res.json()).then(data =>{
            let {name, country, state}= data[0];
            getweatherDetails(name, latitude, longitude, country, state);
        }).catch(() =>{
            alert('Failed to fetch user coordinates');
        });
        
    }, error =>{
        if(error.code === error.PERMISSION_DENIED){
            alert('Geolocation permission denied .please reset location permission to grant access again');
        }
    });
}

searchbtn.addEventListener('click',getCityCoordinates);
locationbtn.addEventListener('click',getUsercoordinates);
cityInput.addEventListener('keyup', e=> e.key === 'Enter'&& getCityCoordinates());
window.addEventListener('load',getUsercoordinates);