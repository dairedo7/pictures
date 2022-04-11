import './sass/main.scss';
import { getRefs } from './js/getRefs'
import { getPics } from './js/API/pictures'

import { renderPictures } from './js/renderComments'
import { LoadMoreBtn } from './js/LoadMoreBtn'
import { showNotify } from './js/showNotify';
// import { picturesTemplate } from './templates/renderPics.hbs'

const { commentsContainer } = getRefs();
const loadMoreBtn = new LoadMoreBtn({
    selector: '#load-btn',
    className: 'is-hidden',
    isHidden: true,
    onClick: () => {
      loadPictures()
    }
})

const btn = document.querySelector('.load-more-btn');
btn.addEventListener('click', loadPictures)

const widget = document.querySelector('.widget');
console.log(widget)

let page = 1;
let limit = 10;
let total = 100;
let totalPosts = total / limit;

loadMoreBtn.hide();

loadPictures()
  .then(() => {
    loadMoreBtn.show();
    showNotify('success', 'Comments have been loaded');
    page++;
    // loadMoreBtn.classList.remove('is-hidden');
  })
  .catch(error => console.error(error));


async function loadPictures() {
    try {
        const data = await getPics();
        // console.log(data)
        renderPictures(data, commentsContainer)

        if (page <= totalPosts) {
          loadMoreBtn.hide();
        }
    }
    catch (error) {
        console.log(error);
    }
    page++;
}


import { getWeather } from './js/API/weather'
import { refs } from './js/helpers/weatherRefs'
const widgetList = document.querySelector('.widget-list');

const weatherItems = refs();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        loadWeather(lat, long)
    })
}
async function loadWeather(lat, long) {

  const response = await getWeather(lat, long);
  console.log(response.weather[0].description);
  const { main, weather, name } = response;
  
  return renderMarkup(response);
}

function renderMarkup({ main, weather, name }) {
  const { temperature, weatherState, city, icon } = weatherItems;

  temperature.textContent += main.temp;
  weatherState.textContent += weather[0].description;
  city.textContent += name;

  const iconLink = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  icon.setAttribute('src', iconLink);
}
