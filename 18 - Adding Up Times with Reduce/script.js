const timeNodes = Array.from(document.querySelectorAll(`[data-time]`)); // converts nodeList into an array

const seconds = timeNodes
  .map(li => li.dataset.time)
  .map(time => {
    const [mins, secs] = time.split(':').map(parseFloat); // parseFloat converts every string elements of time.split(':') into numbers
    return (mins * 60 + secs);
  })
  .reduce((total, sec) => total + sec, 0);

console.log(seconds);

let secondsLeft = seconds

const hours = Math.floor(seconds / 3600);
secondsLeft = secondsLeft % 3600;
const minutes = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, minutes, secondsLeft);
