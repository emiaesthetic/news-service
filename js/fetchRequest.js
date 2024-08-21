import {URL, API_KEY} from './constants.js';

export const getArticles = async (postfix) => {
  const options = {
    headers: {
      'X-Api-Key': API_KEY,
    },
  };

  try {
    const response = await fetch(`${URL}${postfix}`, options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.warn(error);
  }
};
