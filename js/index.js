import {getArticles} from './fetchRequest.js';
import {preload} from './preload.js';
import {preloadImages, renderNews} from './renderNews.js';
import {getTitleEnding} from './utils.js';

const form = document.querySelector('.form');
const select = document.querySelector('.select');
const button = document.querySelector('.form__button');
const newsList = document.querySelector('.news__list');
const title = document.querySelector('.title');

const loadNews = async () => {
  try {
    preload.add();

    const articles = await getArticles('top-headlines?country=ru&pageSize=8');
    const {news, images} = renderNews(articles);

    await preloadImages(images);
    newsList.append(...news);
  } catch (error) {
    console.warn(error);
  } finally {
    preload.remove();
  }
};

loadNews();

const loadSearch = async (query, country) => {
  try {
    preload.add();

    const [everythingArticles, headlinesArticles] = await Promise.all([
      getArticles(`everything?q=${query}&language=${country}&pageSize=8`),
      getArticles(`top-headlines?q=${query}&country=${country}&pageSize=4`),
    ]);

    const articles = [...everythingArticles, ...headlinesArticles];
    const {news, images} = renderNews(articles);

    await preloadImages(images);

    const countNews = articles.length;
    if (countNews === 0) {
      title.textContent = `По запросу "${query}" ничего не найдено :(`;
    } else {
      const titleEnding = getTitleEnding(countNews);
      title.textContent =
        `По запросу "${query}" найдено ${countNews} ${titleEnding}`;
    }

    newsList.innerHTML = '';
    newsList.append(...news);
  } catch (error) {
    console.warn(error);
  } finally {
    preload.remove();
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const queryParam = form.search.value;
  const country = select.value;
  loadSearch(queryParam, country);
});

form.addEventListener('input', () => {
  button.disabled = !form.search.value.trim();
});
