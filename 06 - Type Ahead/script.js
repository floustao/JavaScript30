const cities = [];

const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

fetch(url)
  .then(resp => resp.json()) // transform the data into json
  // .then(data => cities.push(data)); // it gives an array of one element ! an array of an array
  .then(data => cities.push(...data)) // better than push() bcuz it gives an array of 1000 elements.

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    //does it match the word ?
    const regex = new RegExp(wordToMatch, 'gi'); // g = global & i = insensitive case
    return place.city.match(regex) || place.state.match(regex)
  });
}

function displayMatches() {
  console.log(this.value); // get input
  const matchArray = findMatches(this.value, cities); // get array of suggestions
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`); // replace whatever matches with highlighted class and same value
    const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
    return `
    <li>
      <span class='name'>${cityName}, ${stateName} </span>
      <span class='population'>${place.population} </span>
    </li>
    `;
  }).join(''); // create html from the values
  suggestions.innerHTML = html; // replace html
}

const searchInput = document.querySelector(`.search`);
const suggestions = document.querySelector(`.suggestions`);

searchInput.addEventListener('keyup', displayMatches);
