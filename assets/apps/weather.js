let weathergoboing = false;
let weatherInterval; // To hold the interval reference

function getWeather2(city2, system) {
    try {
        const city = document.getElementById(city2)?.value || city2;
        const apiKey = 'b1b534c96a287b05ee3d72fa79800ce1';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=${apiKey}`;

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('City not found!');
                }
                // We fetched the data, we're gonna use the data.
                const data = await response.json();
                const temperature = data.main.temp;
                const conditions = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) + ' km' : 'N/A';
                const pressure = data.main.pressure;
                const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const cloudiness = data.clouds.all;
                const rainfall = data.rain ? data.rain['1h'] + ' mm' : 'N/A';
                const temperatureUnit = system === 'metric' ? 'C' : 'F';
                const weatherInfo = `<p><span class="med">Temperature: </span>${temperature.toFixed(1)}*${temperatureUnit}</p>
                    <p><span class="med">Weather: </span>${conditions}</p>
                    <p><span class="med">Humidity: </span>${humidity}% - <span class="med">Wind speed: </span>${windSpeed} m/s</p>
                    <p><span class="med">Visibility: </span>${visibility} - <span class="med">Pressure: </span>${pressure} hPa</p>
                    <p><span class="med">Sunrise: </span>${sunriseTime} - <span class="med">Sunset: </span>${sunsetTime}</p>
                    <p><span class="med">Cloudiness: </span>${cloudiness}% - <span class="med">Rainfall: </span>${rainfall}</p>`;
                const weatherInfo2 = `${temperature.toFixed(1)}*${temperatureUnit}, ${conditions}`;
                masschange('weather', weatherInfo2);
                masshtml('weathera', weatherInfo);
                console.log('<i> getWeather ran with no errors.');
            } catch (error) {
                masschange('weather', 'An error occurred, check the console.');
                console.log(`<!> ${error}`);
            }
        };

        fetchWeatherData();
        writevar('city', city);
        writevar('unit', system);
        writevar('wd', 'noice');
        fesw('weathers1', 'weathers2');
    } catch (error) {
        console.log(`<!> ${error}`)
    }
}

function checkw(city, sys) {
    getWeather2(city, sys);
}

function getWeather(city3, sys, bypass) {
    if (weathergoboing === false) {
        getWeather2(city3, sys, bypass);
        if (weatherInterval) clearInterval(weatherInterval); // Clear previous interval
        weatherInterval = setInterval(() => checkw(city3, sys), 180000);
    } else {
        console.log('<!> HEYYYYYY!!! WEATHER ALREADY WENT BOING!!!!');
    }
}