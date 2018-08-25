var accordion = function (settings) {

  // Variables
  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModule = document.getElementsByClassName(settings.accordion__module);

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

    // Collapse Module
    } else {
      accordionModule[i].style.maxHeight = 0;
      accordionModule[i].style.overflow = 'hidden';

    }
  }

  function getModuleMaxHeight(moduleIndex) {
    return parseFloat(window.getComputedStyle(accordionModule[moduleIndex], null).getPropertyValue('max-height'))
  }

};

accordion({accordion__btn: 'accordion__btn', accordion__module: 'accordion__module'});

