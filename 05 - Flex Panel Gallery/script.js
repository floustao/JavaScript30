const panels = document.querySelectorAll(`.panel`);

function toggleOpen() {
  this.classList.toggle(`open`);
};

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
  this.classList.toggle(`open-active`);
  }
};

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
// no need to write toggleOpen() because we do not want the function but just the reference of the function
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
