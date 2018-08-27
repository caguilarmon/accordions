var accordion = function (settings) {

  // Variables
  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModules = document.getElementsByClassName(settings.accordion__module);

  for (var i = 0; i < accordionBtns.length; i++) {
      typeHandler(i);
  }

  function typeHandler(i) {
    switch(settings.type) {
      case 'animated':
        addClass(accordionModules[i], 'accordion__module--animated');
        accordionBtns[i].addEventListener('click', moduleHandlerAnimated.bind(this, accordionModules[i]), false);
        break;
      case 'no-animation':
        addClass(accordionModules[i], 'accordion__module--no-animation');
        accordionBtns[i].addEventListener('click', moduleHandlerNoAnimation.bind(this, accordionModules[i]), false);
        break;
      default:
        console.log('Please select an animation type');
    }
  }

  // -------------------- Animated Accordion -------------------------------- //
  function moduleHandlerAnimated(accordionMod) {

    var moduleMaxHeight = getModuleMaxHeight(accordionMod);

    // Expand Module
    if (moduleMaxHeight === 0){
      setTransitionSpeedIfAdded(accordionMod);
      accordionMod.style.maxHeight = accordionMod.scrollHeight + 'px';
      accordionMod.addEventListener('transitionend', setOverflow, false);
      // Set overflow to auto at the end of the expand, to add a scroll if the window is resized
      function setOverflow() {
        if(getModuleMaxHeight(accordionMod) !== 0){
          accordionMod.style.overflow = 'auto';
        }
      }
    // Collapse Module
    } else {
      accordionMod.style.maxHeight = 0;
      accordionMod.style.overflow = 'hidden';
    }

    function getModuleMaxHeight(accordionMod) {
      return parseFloat(window.getComputedStyle(accordionMod, null).getPropertyValue('max-height'));
    }
  }

  // -------------------- No animation Accordion -------------------------------- //
  function moduleHandlerNoAnimation(accordionMod) {
    if (accordionMod.style.display==='block') {
      accordionMod.style.display='none';
    } else {
      accordionMod.style.display='block';
    }
  }

  // -------------------- Helper Functions -------------------------------- //
  function addClass(elem, accordionClass) {
    elem.classList.add(accordionClass);
  }

  function isValueNumeric(val) {
    return Number(val) === val;
  };

  function setTransitionSpeedIfAdded(elem) {
    if (isValueNumeric(settings.speed)) {
      elem.style.transitionDuration = settings.speed + 's';
    }
  }

};

accordion({accordion__btn:'accordion__btn', accordion__module:'accordion__module', type:'animated', speed:.6});
