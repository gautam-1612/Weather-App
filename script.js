let searchbutton = () => {
    let city = document.getElementsByClassName("citytext")[0].value;
    getweather(city)
  document.getElementsByClassName("content")[0].style.visibility = "visible";
    document.getElementsByClassName("citytext")[0].value = "";
}

let data;

let getweather = async (city, APIkey = "0f382574292908144e4e1afe27e24dae") => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
    if (response.ok) {
        data = await response.json()
    }
    else {
        alert("Enter valid City name !")
        console.log("Error: ", response.status, response.text)
    }
    console.log(data)

    //creating elements
    let location = document.getElementsByClassName("location")[0]
    location.firstElementChild.setAttribute("src", "assets/placeholder.png")
    location.getElementsByTagName("p")[0].textContent = `City: ${data.name}`;

    let temp = document.getElementsByClassName("temp")[0]
    temp.firstElementChild.setAttribute("src", "assets/hot.png")
    temp.getElementsByTagName("p")[0].textContent = `Temp: ${data.main.temp}`;

    //description 
    let description = document.getElementsByClassName("description")[0];
    let weatherDesc = data.weather[0].description;

    // Map weather descriptions to icon paths
    const iconMap = {
        "light rain": "assets/light-rain.png",
        "moderate rain": "assets/light-rain.png",
        "heavy rain": "assets/heavy-rain.png",
        "clear sky": "assets/sun.png",
        "few clouds": "assets/clouds.png",
        "scattered clouds": "assets/clouds.png",
        "broken clouds": "assets/clouds.png",
        "overcast clouds": "assets/clouds.png",
        "snow": "assets/snowy.png",
        "mist": "assets/snowy.png",
        "fog": "assets/fog.png",
        "thunderstorm": "assets/storm.png"
    };

    // Check if weather description exists in the map
    if (iconMap[weatherDesc]) {
        description.firstElementChild.setAttribute("src", iconMap[weatherDesc]);
    } else {
        // Default icon if description not mapped
        description.firstElementChild.setAttribute("src", "assets/sun.png");
    }
    description.getElementsByTagName("p")[0].textContent = `Description: ${data.weather[0].description}`;


    let humidity = document.getElementsByClassName("humidity")[0]
    humidity.firstElementChild.setAttribute("src", "assets/water-drop.png")
    humidity.getElementsByTagName("p")[0].textContent = `Humidity: ${data.main.humidity}`;

    let wind = document.getElementsByClassName("wind")[0]
    wind.firstElementChild.setAttribute("src", "assets/wind.png")
    wind.getElementsByTagName("p")[0].textContent = `Wind: ${data.wind.speed}`;

    let feels = document.getElementsByClassName("feels")[0]
    if(data.main.feels_like < 8){
        feels.firstElementChild.setAttribute("src", "assets/cold.png")
    }
    else if(data.main.feels_like > 28){
        feels.firstElementChild.setAttribute("src", "assets/sweating.png")
    }
    else{
         feels.firstElementChild.setAttribute("src", "assets/rolling-eyes.png")
    }
    feels.getElementsByTagName("p")[0].textContent = `Feels-like: ${data.main.feels_like}`;

}


