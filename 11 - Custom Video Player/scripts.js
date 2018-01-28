// Get elements
const player = document.querySelector(`.player`);
const video = player.querySelector( `.viewer`);
const toggle = player.querySelector(`.toggle`);
const skipButtons = player.querySelectorAll(`[data-skip]`);
const ranges = player.querySelectorAll(`.player__slider`);
const progress = player.querySelector(`.progress`);
const progressBar = player.querySelector(`.progress__filled`);

// Create functions()

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function toggleButton() {
  const icon = video.paused ? '||' : '►';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
video[this.name] = this.value;
}

function handleProgress() {
  // console.log(e.offsetX);
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Hook up addEventListeners

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);
