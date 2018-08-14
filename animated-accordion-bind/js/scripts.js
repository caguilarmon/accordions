(function accordionHandler() {

  // Variables
  var accordionBtns = document.getElementsByClassName('accordion__btn');
  var accordionModule = document.getElementsByClassName('accordion__module');

  for (var i = 0; i < accordionBtns.length; i++) {
      accordionBtns[i].addEventListener('click', moduleHandler.bind(this, i), false);
  }

  function moduleHandler(i) {

    var moduleMaxHeight = getModuleMaxHeight(i);

    // Expand Module    
    if (moduleMaxHeight === 0){ 
      accordionModule[i].style.maxHeight = accordionModule[i].scrollHeight + 'px';
      accordionModule[i].addEventListener("transitionend", setOverflow, false);

      // Set overflow to auto at the end of the expand, to add a scroll if the window is resized
      function setOverflow() {
        if(getModuleMaxHeight(i) !== 0){
          accordionModule[i].style.overflow = 'auto';
        }
      }

      // console.log(accordionModule[i].style.maxHeight);
      // console.log(window.getComputedStyle(accordionModule[i], null).getPropertyValue('max-height'));

      // Collapse Module
    } else {
      accordionModule[i].style.maxHeight = 0;
      accordionModule[i].style.overflow = 'hidden';

      // console.log('else');
      // console.log(accordionModule[i].style.maxHeight);
      // console.log(window.getComputedStyle(accordionModule[i], null).getPropertyValue('max-height'));
    }
  }

  function getModuleMaxHeight(moduleIndex) {
    return parseFloat(window.getComputedStyle(accordionModule[moduleIndex], null).getPropertyValue('max-height'))
  }

})();
