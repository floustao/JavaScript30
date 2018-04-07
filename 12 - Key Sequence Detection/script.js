const array = [];
const secretcode = 'flo';

function whatKey(e) {
  array.push(e.key);
  array.splice(-secretcode.length - 1, array.length - secretcode.length);
  if (array.join('').includes(secretcode)) {
    cornify_add();
  }
}

window.addEventListener('keyup', whatKey);
