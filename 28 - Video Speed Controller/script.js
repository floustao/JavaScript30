const speed = document.querySelector(`.speed`);
const bar = speed.querySelector(`.speed-bar`);
const video = document.querySelector(`.flex`);

function handleVideoRate(e) {
  const y = e.pageY - this.offsetTop;
  const percentage = (y / this.offsetHeight);

  const min = 0.4;
  const max = 4;
  const height = Math.round(percentage * 100) + '%';
  bar.style.height = height;

  const playbackRate = percentage * (max - min) + min;
  bar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
};

// speed.addEventListener('mousedown', handleVideoRate);
speed.addEventListener('mousemove', handleVideoRate);
