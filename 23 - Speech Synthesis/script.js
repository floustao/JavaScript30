const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector(`[name='text']`).value; // sets default text

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    // .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value='${voice.name}'>${voice.name} (${voice.lang})`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // to stop and restart speak everytime voice is changed
}

function toggle(startOver = true) {
  speechSynthesis.cancel(); // stops
  if (startOver) {
    speechSynthesis.speak(msg); // restarts
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
