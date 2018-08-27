var accordion = function (settings) {

  // Variables
  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModule = document.getElementsByClassName(settings.accordion__module);

  for (var i = 0; i < accordionBtns.length; i++) {
      typeHandler(i);
  }

  function typeHandler(i) {
    switch(settings.type) {
      case 'animated':
        addClass(accordionModule[i], 'accordion__module--animated');
        accordionBtns[i].addEventListener('click', moduleHandlerAnimated.bind(this, i), false);
        break;
      case 'no-animation':
        addClass(accordionModule[i], 'accordion__module--no-animation');
        accordionBtns[i].addEventListener('click', moduleHandlerNoAnimation.bind(this, i), false);
        break;
      default:
        console.log('Please select an animation type');
    }
  }

  // -------------------- Animated Accordion -------------------------------- //
  function moduleHandlerAnimated(i) {

    var moduleMaxHeight = getModuleMaxHeight(i);

    // Expand Module
    if (moduleMaxHeight === 0){
      setTransitionSpeedIfAdded(i);
      accordionModule[i].style.maxHeight = accordionModule[i].scrollHeight + 'px';
      accordionModule[i].addEventListener('transitionend', setOverflow, false);
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

    function getModuleMaxHeight(i) {
      return parseFloat(window.getComputedStyle(accordionModule[i], null).getPropertyValue('max-height'));
    }
  }

  // -------------------- No animation Accordion -------------------------------- //
  function moduleHandlerNoAnimation(i) {
    if (accordionModule[i].style.display==='block') {
      accordionModule[i].style.display='none';
    } else {
      accordionModule[i].style.display='block';
    }
  }

  // -------------------- Helper Functions -------------------------------- //
  function addClass(elem, accordionClass) {
    elem.classList.add(accordionClass);
  }

  function isValueNumeric(val) {
    return Number(val) === val;
  };

  function setTransitionSpeedIfAdded(i) {
    if (isValueNumeric(settings.speed)) {
      accordionModule[i].style.transitionDuration = settings.speed + 's';
    }
  }

};

accordion({accordion__btn:'accordion__btn', accordion__module:'accordion__module', type:'animated', speed:.5});
