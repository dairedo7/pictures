import axios from 'axios';
const KEY = `be6da4810d6751cafabb851bf4b3f20b`;

const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        getWeather(lat, long)
    })
}

export async function getWeather(lat, long) {
    const params = new URLSearchParams({
        lat: lat,
        lon: long,
    })
    try {
    const theWeather = await axios.get(`${WEATHER_URL}?${params}&appid=${KEY}&units=metric`);
    console.log(theWeather.data)
    return theWeather.data;
    }
    catch (error) {
        throw Error ('The error status: ', error.status)
    }
}
