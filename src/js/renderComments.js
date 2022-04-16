import { dateFormat } from './helpers/dateFormat'

export function renderPictures(data, container) {
    const markup = data.map(({ createdAt, name, avatar }) => 
        `
        <a class="comments-list__link" href="${avatar}">
          <li class="comments-list__item">
            <p class="post-date">Created ${dateFormat(createdAt)}</p>
            <h2 class="post-name">${name}</h2>
            <img class="post-avatar" src="${avatar}" alt="User's avatar" />
          </li>
       </a>
        `
    ).join('');

    container.insertAdjacentHTML('beforeend', markup);
}

            // <p class="post-date">Created ${dateFormat(createdAt)}</p>
            // <h2 class="post-name">${name}</h2>