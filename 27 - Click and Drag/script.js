const slider = document.querySelector(`.items`);
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft; // to avoid bad position in case of margin on slider
  scrollLeft = slider.scrollLeft; // will be used in mousemove
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) {return}; // stop function from running
  e.preventDefault(); // prevent from selecting text or images while mousemoving
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; // for each px it moves 3px
  slider.scrollLeft = scrollLeft - walk; // to prevent if already scrolled before mousedown
});
