function removeTransition(e) {
  if (e.propertyName !== 'transform') return; //skip propertyNames other than tranform
  (e.target).classList.remove('playing');
};

function playSound(e) {
  //1.Play sound
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`); // select audio correpsonding to good keycode
  if (!audio) return; //skip if audio not existing
  audio.currentTime = 0; // allows to play on and on without waiting for sound to end
  audio.play();
  //2. Add css styling
  const div = document.querySelector(`div[data-key='${e.keyCode}']`); //select html
  div.classList.add('playing');
  //3. Remove styling once sound is over
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
};

window.addEventListener('keydown', playSound);
