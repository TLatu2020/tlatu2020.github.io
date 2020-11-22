const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=5604473&appid=164f498c15ca0ca0e8f322a9fd449b46&units=imperial";
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);

        //Current Condition
        document.getElementById('currentCondition').textContent = jsObject.weather[0].main;

        //Current Temp
        document.getElementById('currentTemp').textContent = jsObject.main.temp;

        //Highest Temp
        document.getElementById('high-temp').textContent = jsObject.main.temp_max;

        //Wind Speed
        document.getElementById('wind-speed').textContent = jsObject.wind.speed;

        //Wind Chill
        let speed = Math.pow(jsObject.wind.speed, 0.16);
        let temp = jsObject.main.temp
        let windChill = Math.round(35.75 * (0.6215 * temp) - (35.75 * speed) + (0.4275 * temp * speed));

        if (temp <= 50 && speed >= 3) {
            document.getElementById('wind-chill').textContent = windChill;
        } else {
            document.getElementById('wind-chill').textContent = "N/A";
        }

        //Humidity Level
        document.getElementById('humidity').textContent = jsObject.main.humidity;




    });

const forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=164f498c15ca0ca0e8f322a9fd449b46&units=imperial";


fetch(forecastURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);

        const fiveDays = jsObject.list.filter(item => item.dt_txt.includes('18:00:00'));

        for (i = 0; i < 1; i++) {
            fiveDays.forEach(forecast => {
                console.log(forecast);

                let card = document.createElement('section');
                let weekDay = document.createElement('p');
                let image = document.createElement('img');
                let temp = document.createElement('p');

                var date = new Date(forecast.dt_txt);
                var day = date.toString();
                day = day.slice(0, 3);
                weekDay.textContent = day;

                image.setAttribute('src', "https://via.placeholder.com/100.png?text=Placeholder");
                image.setAttribute('data-src', 'https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png');
                image.setAttribute('alt', forecast.weather[0].description);

                temp.textContent = Math.round(forecast.main.temp) + " °F";

                card.className = "days";

                card.appendChild(weekDay);
                card.appendChild(image);
                card.appendChild(temp);



                document.querySelector('div.cards').appendChild(card);
            })
        }
    })
    .then(function(imagesToLoad = document.querySelectorAll('img[data-src]')) {
            const loadImages = (image) => {
                image.setAttribute('src', image.getAttribute('data-src'));
                image.onload = () => {
                    image.removeAttribute('data-src');
                };
            };

            const imgOptions = {
                threshold: 0
            };

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((items, observer) => {
                    items.forEach((item) => {
                        if (item.isIntersecting) {
                            loadImages(item.target);
                            observer.unobserve(item.target);
                        }
                    });
                }, imgOptions);
                imagesToLoad.forEach((img) => {
                    observer.observe(img);
                });
            } else {
                imagesToLoad.forEach((img) => {
                    loadImages(img);
                });
            }
        }


    );