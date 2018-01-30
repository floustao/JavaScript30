const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }) // gives a promise
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream); // converts local media to url
      video.play(); // if you inspect html, you can see that source src is a blob => means the raw data is piped in here
    })
    .catch(err => console.error('You denied the webcam', err));
}

//take a frame of this video and paint it on the canvas on the screen
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height) // (0, 0) = top left corner / (width, height) => dimension of image
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('images/jpeg'); // Creates a base64 data in console.
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'Webcam screenshot'); //download event
  // link.textContent = 'Download photo';
  link.innerHTML = `<img src="${data}" alt="webcam snap">` // create an html instead of a link like previously
  strip.insertBefore(link, strip.firstChild); // equivalent of prepend
}

video.addEventListener('canplay', paintToCanvas);

getVideo();

