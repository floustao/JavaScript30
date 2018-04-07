function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// starts script here. Debounce function has been given

//get elements
const sliderImages = document.querySelectorAll(`.slide-in`);

//create function
function handleSlide() {
  sliderImages.forEach(sliderImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
    const bottomOfImage = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop; // true or false
    const isHidden = window.scrollY > bottomOfImage; // true or false
    if (isHalfShown && !isHidden) {
      sliderImage.classList.add(`active`);
    } else {
      sliderImage.classList.remove(`active`);
    }
  });
}

// hook uo addEventListeners
window.addEventListener('scroll', debounce(handleSlide));
