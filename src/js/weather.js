import { getWeather } from './js/API/weather'
const widgetList = document.querySelector('.widget-list');

async function loadWeather() {
    const response = getWeather();
    console.log(response);
    renderMarkup(response);
}

loadWeather();

function renderMarkup(weather) {
    const markup = weather.map(({ main, weather, name }) => {
        return `
        <li class='widget-list__temp'>${main}</li>
        <li class='widget-list__descr'>${weather}</li>
        <li class='widget-list__city'>${name}</li>
        `
    })

    widgetList.append(markup);
}