const createImage = (src) => {
  const image = new Image(270, 200);
  image.src = src || '/image/card/no-image.jpg';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'card__image';
  imageWrapper.append(image);

  return {
    imageWrapper,
    image,
  };
};

export const preloadImages = (images) => Promise.all(
    images.map(image => new Promise((resolve, reject) => {
      image.addEventListener('load', () => {
        resolve();
      });
      image.addEventListener('error', () => {
        reject(new Error(`Не удалось загрузить изображение: ${image.src}`));
      });
    })),
);

const formatDate = (isoDate) => {
  const dateTime = new Date(isoDate);

  const date = dateTime.toLocaleString('en-GB', {
    'day': 'numeric',
    'month': 'numeric',
    'year': 'numeric',
  });

  const time = dateTime.toLocaleString('en-GB', {
    'hour': 'numeric',
    'minute': 'numeric',
  });

  return `
    <time datetime="${date}">${date}</time>
    <time datetime="${time}">${time}</time>
  `;
};

export const renderNews = (data) => {
  const images = [];
  const cards = data.map(item => {
    const {imageWrapper, image} = createImage(item.urlToImage);
    images.push(image);

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__content">
        <h3 class="card__title">
          <a class="card__link link-reset" href="${item.url}">${item.title}</a>
        </h3>
        <p class="card__description">${item.description || ''}</p>
        <div class="card__info">
          <span class="card__date-time">${formatDate(item.publishedAt)}</span>
          <span class="card__author">${item.author || ''}</span>
        </div>
      </div>
    `;
    card.prepend(imageWrapper);

    const cardWrapper = document.createElement('li');
    cardWrapper.className = 'news__item';
    cardWrapper.append(card);

    return cardWrapper;
  });

  return {
    news: cards,
    images,
  };
};
