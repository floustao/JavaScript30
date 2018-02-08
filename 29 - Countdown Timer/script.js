let countdown; // to store setInterval and stop countdown once it reaches 0
const timerDisplay = document.querySelector(`.display__time-left`);
const endTime = document.querySelector(`.display__end-time`);
const buttons = document.querySelectorAll(`[data-time]`);
const inputTimer = document.customForm; // when name in html => can call it directly


function timer(seconds) {
  // clear any timer currently working
  clearInterval(countdown)

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it !
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);


}

function displayTimeLeft(seconds) {
  // console.log(seconds);
  const hours = Math.floor(seconds / 3600);
  let remainderSeconds = seconds % 3600;
  const minutes = Math.floor(remainderSeconds / 60);
  remainderSeconds = remainderSeconds % 60;
  // console.log({hours, minutes, remainderSeconds});
  timerDisplay.textContent = `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${remainderSeconds > 9 ? remainderSeconds : '0' + remainderSeconds}`;
  document.title = timerDisplay.textContent; // to change title of tab
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${hours}:${minutes > 9 ? minutes : '0' + minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

inputTimer.addEventListener("submit", function(e) {
  e.preventDefault();
  const minutes = this.minutes.value; // check params url
  timer(minutes * 60);
  this.reset();
});
