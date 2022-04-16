import './sass/main.scss';
import { getRefs } from './js/getRefs'
import { getPics } from './js/API/pictures'
import { renderPictures } from './js/renderComments'
import { LoadMoreBtn } from './js/LoadMoreBtn'
import { showNotify } from './js/showNotify';
import { Notify } from 'notiflix';
import { getWeather } from './js/API/weather'
import { renderWeather } from './js/renderWeather'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom' });


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
    lightbox.refresh();
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
        lightbox.refresh();
        if (page <= totalPosts) {
          loadMoreBtn.hide();
        }
    }
    catch (error) {
        console.log(error);
    }
    page++;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        loadWeather(lat, long)
    })
}

async function loadWeather(lat, long) {
  const response = await getWeather(lat, long);
  const render = renderWeather(response);
  console.log(response)
  notifyWeather(response);
}

async function notifyWeather(data) {
  if (data.main !== '' || data.weather.length > 0 || data.name !== '') {
      Notify.success(`Weather has been updated`)
  }
}