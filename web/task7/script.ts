const button = document.getElementById("btn") as HTMLButtonElement;
const input = document.getElementById("cityInput") as HTMLInputElement;
const output = document.getElementById("output") as HTMLDivElement;


interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    name: string;
}

interface WeatherError {
    message: string;
}

type WeatherResponse = WeatherData | WeatherError;


async function fetchWeather(city: string): Promise<WeatherResponse> {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8c27da2e6d6c1f852b8042d223709ea`
    );

    return response.json();
}


function displayWeather(data: WeatherResponse): void {

   
    if ("message" in data) {
        output.innerText = "Error: " + data.message;
        return;
    }

    output.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

button.addEventListener("click", async () => {
    const city = input.value.trim();

    if (!city) {
        output.innerText = "Please enter a city.";
        return;
    }

    output.innerText = "Loading...";

    try {
        const data = await fetchWeather(city);
        displayWeather(data);
    } catch {
        output.innerText = "Network error. Try again.";
    }
});