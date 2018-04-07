const secondHand = document.querySelector(`.second-hand`);
const minHand = document.querySelector(`.min-hand`);
const hourHand = document.querySelector(`.hour-hand`);

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondDegrees = (seconds/60)*360 + 90; // we need to fix the offset of 90 degrees created #66
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;

  const mins = now.getMinutes();
  const minDegrees = (mins/60)*360 + 90;
  minHand.style.transform = `rotate(${minDegrees}deg)`;

  const hours = now.getHours();
  const hourDegrees = (hours/60)*360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};

const intervalID = window.setInterval(setDate,1000);
