const triggers = document.querySelectorAll(`a`);
const highlight = document.createElement(`span`);
highlight.classList.add('highlight'); // check CSS
document.body.append(highlight);

function highlightLink() {
  const linkCoords = this.getBoundingClientRect();

  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    left: linkCoords.left + window.scrollX, // to correct bug from scrolling
    top: linkCoords.top + window.scrollY, // to correct bug from scrolling
  };

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
