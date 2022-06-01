function weatherApp(){

 

    function getWeather(callback,city){
    weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=b68915cf25f7c0f7d27002ebf4b73dbd"
        fetch(weatherApi)
            .then(function(response) {
                return response.json()
            })
            .then(callback)
            .catch(error =>{
                alert('Not found location')
            })
    }


    function renderWeather(data) {
        const heading = document.querySelector('.heading')
        const temp = document.querySelector('.temp')
        const statusImg = document.querySelector('.status-img')
        const statusText = document.querySelector('.status-text')
        const humidity = document.querySelector('.humidity')
        const wind = document.querySelector('.wind')
        

        heading.innerText = `Weather in ${data.name}`
        temp.innerText = `${data.main.temp} °C`
        statusImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        statusText.innerText = `${data.weather[0].description}`
        humidity.innerText = `Humidity: ${data.main.humidity} %`
        wind.innerText = `Wind speed: ${data.wind.speed} km/h`
        document.body.style.background = `url('https://source.unsplash.com/1600x900/?${data.name}') top center / cover no-repeat`


    }

    function weatherSearch(cityName) {
        const searchBtn = document.querySelector('.search-btn')
        const searchInput = document.querySelector('.search-input')

        searchBtn.addEventListener('click', () => {
            cityName = searchInput.value
            getWeather(renderWeather, cityName)
            
        })

        document.addEventListener('keydown', (e) => {
            if(e.key == 'Enter'){
                cityName = searchInput.value
                getWeather(renderWeather, cityName)
            }
            
            
        })

    }

    weatherSearch()



}