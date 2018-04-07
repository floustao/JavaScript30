const nav = document.querySelector(`.top`);
const background = document.querySelector(`.dropdownBackground`);
const triggers = document.querySelectorAll(`.menu > li`);

function handleEnter() {
  this.classList.add(`trigger-enter`);
  setTimeout(() => this.classList.contains(`trigger-enter`) && this.classList.add(`trigger-enter-active`), 150); // to avoid bug if we mouseleave before 150 ms => active stays !
  background.classList.add(`open`);

  const dropdown = this.querySelector(`.dropdown`);
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect(); // to prevent bugs in case we add some HTML => tout se decalerait sans ca

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    left: dropdownCoords.left - navCoords.left,
    top: dropdownCoords.top - navCoords.top
  };

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove(`open`);
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
