export const getTitleEnding = (number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ['результат', 'результата', 'результатов'];

  if (number % 100 > 4 && number % 100 < 20) {
    return titles[2];
  } else {
    const index = cases[number % 10 < 5 ? number % 10 : 5];
    return titles[index];
  }
};
