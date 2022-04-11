import './sass/main.scss';
import * as APIService from './js/API/pictures'
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

let page = 1;
let limit = 10;
let total = 100;
let totalPosts = total / limit;

loadMoreBtn.hide();

// const loadBtn = document.getElementById('load-btn');
// loadMoreBtn.addEventListener('click', loadPictures());

// loadMoreBtn.classList.add('is-hidden');

loadPictures()
  .then(() => {
    loadMoreBtn.show();
    showNotify('success', 'Comments have been loaded');
    page++;
    // loadMoreBtn.classList.remove('is-hidden');
  })
  .catch(error => console.error(error));

// function loadPictures() {
//   return APIService.getPics().then(data => {
//     renderPictures(data.pictures, commentsContainer);

//     if (!data.hasNextPage) {
//       loadMoreBtn.classList.add('is-hidden');
//       showNotify('error', 'The end of search results');
//     }
//   });
// }

async function loadPictures() {
    try {
        const data = await getPics();
        console.log(data)
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
