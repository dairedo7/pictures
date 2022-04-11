import { dateFormat } from './helpers/dateFormat'

export function renderPictures(data, container) {
    const markup = data.map(({ createdAt, name, avatar }) => 
        `
        <ul class="comments-list">
          <li class="comments-list__item">
            <p class="post-date">Created ${dateFormat(createdAt)}</p>
            <h2 class="post-name">${name}</h2>
            <img class="post-avatar" src="${avatar}" alt="User's avatar" />
          </li>
        </ul>
        `
    ).join('');

    container.insertAdjacentHTML('beforeend', markup);
}
