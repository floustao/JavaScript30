
const checkboxes = document.querySelectorAll(`.inbox input[type='checkbox']`); // select all checkboxes

let lastChecked; // to set variable

function handleChecking(e) {
  let inBetween = false; // not in between y default
  if (e.shiftKey && this.checked) { // if shiftkey is down AND it is a checking action
    checkboxes.forEach(checkbox => {
      // console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween; // set inBetween to true between the two checkboxes this and lastChecked
      }
      console.log(inBetween);
      if (inBetween) {
        checkbox.checked = true
      }
    })
  }
  lastChecked = this;
  // console.log(this);
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleChecking));
