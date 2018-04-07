const hero = document.querySelector(`.hero`);
const text = hero.querySelector(`h1`);
const stretch = 25; // 100px

function shadow(e) {
  // const width = hero.offsetWidth;
  // const height = hero.offsetHeight;
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xStretch = Math.round((x / width * stretch) - (stretch / 2));
  const yStretch = Math.round((y / height * stretch) - (stretch / 2));

  text.style.textShadow = `
    ${xStretch}px ${yStretch}px 0 red
  `;
}

hero.addEventListener('mousemove', shadow);
