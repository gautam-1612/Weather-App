let currentcity = null;

//weather conversion
let unit = 'c';
let unitconversion = () => {
    let elem = document.querySelector(".conversion");
    elem.firstElementChild.classList.toggle("clicked")
    elem.children[1].classList.toggle("clicked")
    unit = (unit === 'c') ? 'f' : 'c';

    if (currentcity) {
        getweather(currentcity, unit);
    }
}



// ########### Local storage ############

let history = () => {
    if (localStorage.getItem("placesqueue")) {
        let placequeue = JSON.parse(localStorage.getItem("placesqueue"));
        let element = document.querySelector(".prevsearch");
        for (let i = 0; i < element.children.length; i++) {
            const child = element.children[i];
            if (i < placequeue.length) {
                child.style.display = "flex";
                child.firstElementChild.textContent = placequeue[i];
                child.onclick = () => getweather(placequeue[i], unit);
            } else {
                child.style.display = "none";
            }
        }
    }
}
window.onload = history;



// ########### search ############


let searchbutton = () => {
    let city = document.querySelector(".citytext").value;
    getweather(city, unit)
}

let input = document.querySelector(".box").firstElementChild;
input.addEventListener('keyup', (k) => {
    if (k.key == "Enter") {
        searchbutton()
    }
})



// ########### API/Fetch weather ############

let getweather = async (city, unit, APIkey = "0f382574292908144e4e1afe27e24dae") => {
    currentcity = city;
    let data;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
    if (response.ok) {
        data = await response.json();
        let places = JSON.parse(localStorage.getItem("placesqueue")) || [];
        let flag = true;
        places.forEach(element => {
            if (city == element) {
                flag = false;
            }
        });
        if (flag) {
            if (places.length > 4) {
                places.shift();
            }
            places.push(city);
            localStorage.setItem('placesqueue', JSON.stringify(places));
            history();
        }
    }
    else {
        alert("Enter valid City name !")
        console.log("Error: ", response.status, response.text)
        return
    }
    console.log(data)

    document.querySelector(".content").style.visibility = "visible";
    document.querySelector(".citytext").value = "";
    //creating elements
    let location = document.querySelector(".location")
    location.firstElementChild.setAttribute("src", "assets24/pin.png")
    location.getElementsByTagName("p")[0].textContent = `${data.name} (${data.sys.country})`;

    let temp = document.querySelector(".temp")
    temp.firstElementChild.setAttribute("src", "assets24/hot.png")
    if (unit === 'c') {
        temp.getElementsByTagName("p")[0].textContent = `Temp: ${data.main.temp} C`;
    }
    else {
        let value = data.main.temp * 9 / 5 + 32;
        temp.getElementsByTagName("p")[0].textContent = `Temp: ${value.toFixed(1)} F`;
    }


    //description 
    let description = document.querySelector(".description");
    let weatherDesc = data.weather[0].description;

    // Map weather descriptions to icon paths
    const iconMap = {
        "light rain": "assets24/light-rain.png",
        "moderate rain": "assets24/light-rain.png",
        "heavy rain": "assets24/heavy-rain.png",
        "clear sky": "assets24/sun.png",
        "few clouds": "assets24/cloudy.png",
        "scattered clouds": "assets24/clouds.png",
        "broken clouds": "assets24/cloudy.png",
        "overcast clouds": "assets24/clouds.png",
        "snow": "assets24/snowy.png",
        "mist": "assets24/snowy.png",
        "fog": "assets24/fog.png",
        "thunderstorm": "assets24/thunder-storm.png",
        "haze": "assets24/foggy.png",
        "thunderstorm with heavy rain": "assets24/heavy-rain.png"
    };

    // Check if weather description exists in the map
    if (iconMap[weatherDesc]) {
        description.firstElementChild.setAttribute("src", iconMap[weatherDesc]);
    } else {
        // Default icon if description not mapped
        description.firstElementChild.setAttribute("src", "assets24/sun.png");
    }
    description.getElementsByTagName("p")[0].textContent = `${data.weather[0].description}`;
    description.getElementsByTagName("p")[0].style.textAlign = "center"

    let humidity = document.querySelector(".humidity")
    humidity.firstElementChild.setAttribute("src", "assets24/droplet.png")
    humidity.getElementsByTagName("p")[0].textContent = `Humidity: ${data.main.humidity}`;

    let wind = document.querySelector(".wind")
    wind.firstElementChild.setAttribute("src", "assets24/wind.png")
    wind.getElementsByTagName("p")[0].textContent = `Wind: ${data.wind.speed}`;

    let feels = document.querySelector(".feels")
    if (data.main.feels_like < 8) {
        feels.firstElementChild.setAttribute("src", "assets24/cold.png")
    }
    else if (data.main.feels_like > 28) {
        feels.firstElementChild.setAttribute("src", "assets24/sweat.png")
    }
    else {
        feels.firstElementChild.setAttribute("src", "assets24/gestures.png")
    }

    if (unit === 'c') {
        feels.getElementsByTagName("p")[0].textContent = `Feels like: ${data.main.feels_like} C`;
    }
    else {
        let value = data.main.feels_like * 9 / 5 + 32;
        feels.getElementsByTagName("p")[0].textContent = `Feels like: ${value.toFixed(1)} F`;
    }
}


// ########### Enabling Theme ############

let flag = true;

function roll() {
    document.querySelector(".ball").classList.toggle("rolled");
    document.querySelector(".citytext").classList.toggle("darkcitytext");
    document.querySelector(".box").classList.toggle("boxdark");
    document.querySelector(".body").classList.toggle("bodydark");
    document.querySelector(".content").classList.toggle("contentdark");
    document.querySelector(".prevsearch").classList.toggle("darkprevsearch");
    document.querySelector(".conversion").classList.toggle("darkconversion");

    document.querySelectorAll(".clicked").forEach(elem => {
        elem.classList.toggle("darkclicked");
    });

    
    let searchimg = document.querySelector(".searchh");
    if (flag) {
        searchimg.setAttribute("src", "assets24/search-interface-symbol (1).png");
        flag = false;
    } else {
        searchimg.setAttribute("src", "assets24/search-interface-symbol.png");
        flag = true;
    }
}
