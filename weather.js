function getWeather() {
    let city = document.getElementById("city").value.trim(); // Remove spaces

    // if (city === "Lahore", "London", "New York","karachi") {
    //     city = "Karachi"; // 🔹 Default to Karachi if the input is empty
    // }

    const apiKey = "6121c21b244a978e662974d691adadaa"; // 🔹 Replace with your OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Ensure main data exists before accessing properties
                if (!data.main || !data.wind || !data.weather) {
                    throw new Error("Invalid data received from API");
                }

                // Extract weather details
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherDesc = data.weather[0].description;
                const cityName = data.name;
                const country = data.sys.country;

                // Display weather info
                document.getElementById("weather-info").innerHTML = `
                    <h2>📍 ${cityName}, ${country}</h2>
                    <p>🌡️ Temperature: <b>${temp}°C</b></p>
                    <p>💧 Humidity: <b>${humidity}%</b></p>
                    <p>🌬️ Wind Speed: <b>${windSpeed} m/s</b></p>
                    <p>☁️ Weather: <b>${weatherDesc}</b></p>
                `;

                // Textile industry recommendations
                let advice = "<h3>📌 Textile Industry Insights:</h3>";
                if (humidity > 70) {
                    advice += "<p>⚠️ **High humidity** - Use dehumidifiers for efficient dyeing & drying.</p>";
                } else if (humidity < 30) {  // ✅ Fixed unrealistic value
                    advice += "<p>⚠️ **Low humidity** - Risk of static in synthetic fibers.</p>";
                }

                if (temp > 35) {
                    advice += "<p>🔥 **High temperature** - Monitor water evaporation in dyeing units.</p>";
                } else if (temp < 10) {
                    advice += "<p>❄️ **Cold temperature** - Drying slows down. Consider controlled heating.</p>";
                }

                if (windSpeed > 10) {
                    advice += "<p>🌪️ **Strong winds** - Secure fabrics during outdoor drying.</p>";
                }

                document.getElementById("textile-advice").innerHTML = advice;
            } else {
                // Handle "City not found" case
                document.getElementById("weather-info").innerHTML = `<p>❌ City not found! Try another name.</p>`;
                document.getElementById("textile-advice").innerHTML = "";
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById("weather-info").innerHTML = `<p>❌ Unable to fetch weather data. Check your internet connection or API key.</p>`;
            document.getElementById("textile-advice").innerHTML = "";
        });
}
