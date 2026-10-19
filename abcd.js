// console.log("Hello World");
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Switch to light mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "Switch to dark mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
});

const weatherContent = document.getElementById("weather-content");
const weatherApiKey = "de65893db7ea9bac674a77bb3b328dd7";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=26.9124&lon=75.7873&units=metric&appid=${weatherApiKey}`;

async function loadWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`Weather request failed (${response.status})`);
        }

        const weather = await response.json();
        const condition = weather.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}.png`;

        weatherContent.innerHTML = `
            <div class="weather-current">
                <img src="${iconUrl}" alt="${condition.description}">
                <p class="weather-temperature">${Math.round(weather.main.temp)}°C</p>
            </div>
            <p class="weather-description">${condition.description}</p>
        `;
    } catch (error) {
        weatherContent.innerHTML = '<p class="weather-status">Weather is currently unavailable.</p>';
        console.error("Unable to load Jaipur weather:", error);
    }
}

loadWeather();


// let url ="https://catfact.ninja/fact";
// async function getFact() {
//     let res = await fetch(url);
//     let data = await res.json();
//     console.log(data);
    
// }