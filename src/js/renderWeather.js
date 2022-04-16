import { refs } from './helpers/weatherRefs'

const weatherItems = refs();

export function renderWeather({ main, weather, name }) {
  const { temperature, weatherState, city, icon } = weatherItems;

  temperature.textContent += Math.round(main.temp);
  weatherState.textContent += weather[0].description;
  city.textContent += name;

  const iconLink = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  icon.setAttribute('src', iconLink);
}
