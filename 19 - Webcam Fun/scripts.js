const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// get the video
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => console.error('You denied the webcam', err));
}

//take a frame of this video and paint it on the canvas on the screen
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height) // (0, 0) = top left corner / (width, height) => dimension of image
    // take the pixels out
    let pixels = ctx.getImageData(0, 0 , width, height); // get the million pixels of the image in an array as RGBA. Array is too big to use map
    // mess with pixels
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // pixels = greenScreen(pixels);
    ctx.globalAlpha = 0.1; // ghost effect !!
    // put pixels back
    ctx.putImageData(pixels, 0, 0)
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('pictures/jpeg'); // Creates a base64 data in console.
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'Webcam screenshot');
  // link.textContent = 'Download photo';
  link.innerHTML = `<img src="${data}" alt="webcam snap">` // create an html instead of a link like previously
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i] * 2;     // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50;// green
    pixels.data[i + 2] = pixels.data[i + 2] / 2; // blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i];     // red
    pixels.data[i + 100] = pixels.data[i + 1];// green
    pixels.data[i - 150] = pixels.data[i + 2]; // blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];   // set red green blue and alpha (transparent)
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // If all are between min-max range, take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

video.addEventListener('canplay', paintToCanvas);

getVideo();

