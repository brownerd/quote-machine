'use strict';

const APPID = '7033705df20e5a38acfbf9006a488e1d';
const city_request = 'http://ip-api.com/json';

var app = document.getElementById("app");


function getLocation(done){
  var xhr = new XMLHttpRequest();
  xhr.open('get', city_request, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status == 200 ){
      var {city, country} = JSON.parse(xhr.responseText);
      
      //console.log(xhr.responseText);
      var weather_request = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APPID}`;
      done(city);
      
      getWeather(function(city_weather){
        //console.log(city_weather);
        
        // app.classList.add("_211-thunderstorm");
        // console.log( app.classList.contains("_211-thunderstorm") );
        
        app.classList.add(`_${city_weather.weather[0].id}`);
        
        //app.classList.add(`_600`);
        
        
        fahrenheit.innerText = kelvinToFahrenheit(city_weather.main.temp);
        celsius.innerText = kelvinToCelsius(city_weather.main.temp);
        // keyword.innerText = city_weather.weather[0].main;
        description.innerText = city_weather.weather[0].description;
        // id.innerText = city_weather.weather[0].id;
        
        
      }, weather_request);
    }
  };
  xhr.send(null);
}

function getWeather(done, weather_request){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status == 200 ){
      var city_weather = JSON.parse(xhr.responseText);
      done(city_weather);
    }
  };
  xhr.open('get', weather_request, true);
  xhr.send(null);
}

function kelvinToFahrenheit (K) {
  return Math.round((K - 273.15)* 1.8000 + 32.00);
}

function kelvinToCelsius (K) {
  return Math.round(K - 273.15);
}



var user_city = document.querySelector('#user_city');
var fahrenheit = document.querySelector('#fahrenheit');
var celcius = document.querySelector('#celsius');
// var keyword = document.querySelector('#keyword');
var description = document.querySelector('#description');
// var id = document.querySelector('#id');


(function () {
  
  
  getLocation(function(city){
    user_city.innerText = city;
    
    //app.classList.add(city_weather.weather[0].id);
    
    // app.classList.add("_211-thunderstorm");
    // console.log( app.classList.contains("_211-thunderstorm") );
  });
  
})();