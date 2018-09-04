var accordion = function (settings) {

  // --------------------  Variables -------------------------------- //
  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModules = document.getElementsByClassName(settings.accordion__module);

  // -------------------- Helper Functions -------------------------------- //
  var addClass = function(elem, accordionClass) {
    elem.classList.add(accordionClass);
  }

  var isValueNumeric = function(val) {
    return Number(val) === val;
  };

  var setTransitionSpeedIfAdded = function(elem) {
    if (isValueNumeric(settings.speed)) {
      elem.style.transitionDuration = settings.speed + 's';
    }
  }

  // -------------------- Animated Accordion -------------------------------- //
  var moduleHandlerAnimated = function(accordionMod) {

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
  var moduleHandlerNoAnimation = function(accordionMod) {
    if (accordionMod.style.display==='block') {
      accordionMod.style.display='none';
    } else {
      accordionMod.style.display='block';
    }
  }

  // -------------------- Type Handler -------------------------------- //
  var typeHandler = function(i) {
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

  // -------------------- Init loop -------------------------------- //
  for (var i = 0; i < accordionBtns.length; i++) {
      typeHandler(i);
  }

};

accordion({accordion__btn:'accordion__btn', accordion__module:'accordion__module', type:'animated', speed:.6});
