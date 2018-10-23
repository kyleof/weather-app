let appId = 'e1b5397a5038aacdc313c44be9e9d0b3';
let units = 'metric';
let searchType;

function getSearchType(searchTerm){
    if(searchTerm === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
      searchMethod = 'zip';
    }
    else {
      searchMethod = 'q';
    }
}


function searchWeather(searchTerm) {
    getSearchType(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result)
    })
}

function init(resultFromServer) {
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
      case 'Clouds':
        document.body.style.backgroundImage = "url('cloudy.jpg')";
        break;
      case 'Clear':
        document.body.style.backgroundImage = "url('clear.jpg')";
        break;
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        document.body.style.backgroundImage = "url('rain.jpg')";
        break;
      case 'Thunderstorm':
        document.body.style.backgroundImage = "url('storm.jpg')";
        break;
      case 'snow':
        document.body.style.backgroundImage = "url('snow.jpg')";
        break;
      default:

    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureComp = document.getElementById('temperature');
    let humidityComp = document.getElementById('humidity');
    let windComp = document.getElementById('wind');
    let cityName = document.getElementById('cityName');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureComp.innerText = Math.floor(resultFromServer.main.temp) + ' Degrees celcius';
    windComp.innerText = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityName.innerText = resultFromServer.name;
    humidityComp.innerText = 'Current humidity is ' + resultFromServer.main.humidity + '%';

    setWeatherPos();

}

function setWeatherPos(){
  let weatherPos = document.getElementById('weatherContainer')
  let weatherContainerHeight = weatherPos.clientHeight;
  let weatherContainerWidth = weatherPos.clientWidth;

  weatherPos.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherPos.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
  weatherPos.style.visibility = 'visible';

}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;

    if (searchTerm) {
        searchWeather(searchTerm);
    }
});
