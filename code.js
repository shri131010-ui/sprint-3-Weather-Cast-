    // only for checking is api applied or Not
 // const API_KEY ="f5db10d2f6fbe4fb4ddd43e9e6afb3b1";
// console.log("javascript connectes");
// console.log(API_KEY);

// actual code:--->


const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const weatherIcon= document.getElementById("weatherIcon");

const API_KEY ="f5db10d2f6fbe4fb4ddd43e9e6afb3b1";

// searchbtn  ka event listner
searchBtn.addEventListener("click", () => {

    const city = cityInput.value;
    
    getWeather(city);
});

// async function internet se data ane ka wait kar sakti hai
async function getWeather(city){
    try{
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;               // url openweathermap ko request bhej raha

    const response = await fetch(url);                         //  fetch server se data mangna
      
    if(!response.ok){
        throw new Error("City not found");
    }
    const data = await response.json();                        // json response ko js object me convert kiya
       updateTheme(data.weather[0].main);
    
    console.log(data.weather[0].icon);
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("city").innerText = data.name;

document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;

document.getElementById("condition").innerText = `Condition: ${data.weather[0].main}`;

document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;

    
} 

 catch(error){
         document.getElementById("city").innerText = "City Not Found";

        document.getElementById("temperature").innerText = "";

        document.getElementById("condition").innerText = "Please Try Again";

        document.getElementById("humidity").innerText = "";

    }}

async function getWeatherByLocation(lat, lon){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    updateTheme(data.weather[0].main);

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("city").innerText = data.name;
    document.getElementById("temperature").innerText =`Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").innerText = `Condition: ${data.weather[0].main}`;
    document.getElementById("humidity").innerText =`Humidity: ${data.main.humidity}%`;
}
navigator.geolocation.getCurrentPosition(
    function(position){

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherByLocation(lat, lon);

    }
);
function updateTheme(weatherMain){

    document.body.classList.remove(
        "clear",
        "clouds",
        "rain"
    );

    if(weatherMain === "Clear"){
        document.body.classList.add("clear");
    }
    else if(weatherMain === "Clouds"){
        document.body.classList.add("clouds");
    }
    else if(weatherMain === "Rain"){
        document.body.classList.add("rain");
    }
}
  
//   getWeather("London");
  