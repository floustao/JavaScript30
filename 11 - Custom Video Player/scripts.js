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

function handleBarProgress() {
  // console.log(e.offsetX);
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleVideoProgress(e) {
  // console.log(e.offsetX);
  // video.currentTime = (e.offsetX * video.duration) / 640;
  const coefficient = (e.offsetX / progress.offsetWidth);
  video.currentTime = coefficient * video.duration;
}

// Hook up addEventListeners

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleBarProgress);

progress.addEventListener('click', handleVideoProgress);

// How to avoid progress update every time mousemoves ? Make sure it updates when mousemove && mousedown ??
// Start with line 2. then line 1, then line 3 and 4.
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && handleVideoProgress(e)); // function is launched only IF mousedown is true
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);



