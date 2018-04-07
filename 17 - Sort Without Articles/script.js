const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(string) {
  // const regex = new RegExp(/^(a |the |an )/i);
  return string.replace(/^(a |the |an )/i, '').trim(); //trim() in case we have double spaces
}

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1 );

document.getElementById(`bands`).innerHTML =
  sortedBands
    .map(bandName => `<li>${bandName}</li>`)
    .join('');
