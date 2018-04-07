const inputs = document.querySelectorAll(`.controls input`); // select controls

function displayValue() {
  const suffix = this.dataset.sizing || ''; // select data-attribute that we want
  console.log(this.value + suffix); // print input value + data-attribute attached
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix );
}

inputs.forEach(input => input.addEventListener('mousemove', displayValue));
inputs.forEach(input => input.addEventListener('change', displayValue)); // change automatically value for color ! Otherwise, you need to select a color and then mouseover the color picker again.
