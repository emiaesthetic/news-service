export const preload = {
  preloadWrapper: document.createElement('div'),
  svg: `
    <svg width="166" height="120" viewBox="0 0 166 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M135.5 30L105.5 60H128C128 84.825 107.825 105 83 105C75.425 105
      68.225 103.125 62 99.75L51.05 110.7C60.275 116.55 71.225 120 83 120C116.15
      120 143 93.15 143 60H165.5L135.5 30ZM38 60C38 35.175 58.175 15 83
      15C90.575 15 97.775 16.875 104 20.25L114.95 9.3C105.725 3.45 94.775 0 83
      0C49.85 0 23 26.85 23 60H0.5L30.5 90L60.5 60H38Z" fill="currentColor" />
    </svg>
  `,

  add() {
    this.preloadWrapper.classList.add('preload');
    this.preloadWrapper.innerHTML = this.svg;
    document.body.append(this.preloadWrapper);
  },

  remove() {
    this.preloadWrapper.remove();
  },
};
