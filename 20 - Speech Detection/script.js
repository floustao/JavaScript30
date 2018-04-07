window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; // without this, you need to stop speaking before seeing the results

let p = document.createElement('p');
const words = document.querySelector(`.words`);
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join(' ');

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
  if (transcript.includes('weather')) {
    window.open("https://weather.com/","_blank")
  }
  if (transcript.includes('news')) {
    window.open("http://www.bbc.com/news","_blank")
  }
  if (transcript.includes('direction')) {
    window.open("https://www.google.com/maps","_blank")
  }
  if (transcript.includes('Twitter')) {
    window.open("https://twitter.com","_blank")
  }
  if (transcript.includes('Facebook')) {
    window.open("https://www.facebook.com/","_blank")
  }
}); // once the result is finish (stop talking), it does not start again => need another event listener => EventListener('end', ...)

recognition.addEventListener('end', recognition.start);

recognition.start();
