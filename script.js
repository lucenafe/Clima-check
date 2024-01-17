document.getElementById('checkWeatherBtn').addEventListener('click', function () {
    const cityInput = document.getElementById('cityInput').value;

    console.log('City Input:', cityInput);

    if (cityInput.trim() !== '') {
        getWeatherData(cityInput);
    } else {
        alert('Por favor, insira o nome da cidade.');
    }
});

function getWeatherData(city) {
    const apiKey = '59d302303b809ee79cf2258b016a5013'; // Substitua com sua chave de API OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Weather Data:', data);
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error('Erro ao obter dados do clima:', error);
        });
}

function displayWeatherInfo(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');

    if (data.cod === '404') {
        // Cidade não encontrada
        weatherInfoDiv.innerHTML = '<p>Cidade não encontrada. Por favor, verifique o nome da cidade.</p>';
    } else {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        const weatherInfoHTML = `<p>Cidade: ${cityName}</p>
                                 <p>Temperatura: ${temperature}°C</p>
                                 <p>Descrição: ${description}</p>`;

        weatherInfoDiv.innerHTML = weatherInfoHTML;
    }
}
