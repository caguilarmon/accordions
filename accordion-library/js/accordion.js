var accordion = function (settings) {

  // -------------------- Variables ----------------------------------------- //
  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModules = document.getElementsByClassName(settings.accordion__module);

  // -------------------- Helper Functions ---------------------------------- //
  var addClass = function(elem, accordionClass) {
    for (var i = 0; i < accordionClass.length; i++) {
      elem.classList.add(accordionClass[i]);
    }
  }

  var removeClass = function(elem, accordionClass) {
    elem.classList.remove(accordionClass);
  }

  var isValueNumeric = function(val) {
    return Number(val) === val;
  };

  var getModuleMaxHeight = function(accordionMod) {
    return parseFloat(window.getComputedStyle(accordionMod, null).getPropertyValue('max-height'));
  }

  var setTransitionSpeed = function(elem) {
      elem.style.transitionDuration = settings.speed + 's';
  }

  var collapseModuleAnimated = function(accordionMod) {
    accordionMod.style.maxHeight = 0;
    removeClass(accordionMod, 'accordion__module--animated-expanded');
    addClass(accordionMod, ['accordion__module--animated-collapsed']);
  }

  var collapseModuleNonAnimated = function(accordionMod) {
    removeClass(accordionMod, 'accordion__module--non-animated-expanded');
    addClass(accordionMod, ['accordion__module--non-animated-collapsed']);
  }

  var checkAndCollapseOtherExpandedModules = function(accordionMod) {
    for (var i = 0; i < accordionModules.length; i++) {
      if (!(accordionModules[i] === accordionMod)) {
        if (settings.type === 'animated') {
          if (getModuleMaxHeight(accordionModules[i]) !== 0) {
            collapseModuleAnimated(accordionModules[i]);
          }
        } else {
          var displayValue = window.getComputedStyle(accordionModules[i], null).getPropertyValue('display');
          if (displayValue === 'block') {
            collapseModuleNonAnimated(accordionModules[i]);
          }
        }
      }
    }
  }

  // -------------------- Animated Accordion -------------------------------- //
  var moduleHandlerAnimated = function(accordionMod) {

    var moduleMaxHeight = getModuleMaxHeight(accordionMod);

    // Expand Module
    if (moduleMaxHeight === 0){
      if (settings.toggleOnOpen) {
        checkAndCollapseOtherExpandedModules(accordionMod);
      }
      if (isValueNumeric(settings.speed)) {
        setTransitionSpeed(accordionMod);
      }
      accordionMod.style.maxHeight = accordionMod.scrollHeight + 'px';
      accordionMod.addEventListener('transitionend', isModuleExpanded, false);
      // Set overflow to auto at the end of the expand,
      // to add a scroll if the window is resized
      function isModuleExpanded() {
        if(getModuleMaxHeight(accordionMod) !== 0){
          removeClass(accordionMod, 'accordion__module--animated-collapsed');
          addClass(accordionMod, ['accordion__module--animated-expanded']);
        }
      }
    // Collapse Module
    } else {
      collapseModuleAnimated(accordionMod);
    }
  }

  // -------------------- No animation Accordion ---------------------------- //
  var moduleHandlerNonAnimated = function(accordionMod) {

    var displayValue = window.getComputedStyle(accordionMod, null).getPropertyValue('display');

    // Expand Module
    if (displayValue === 'none') {
      if (settings.toggleOnOpen) {
        checkAndCollapseOtherExpandedModules(accordionMod);
      }
      removeClass(accordionMod, 'accordion__module--non-animated-collapsed');
      addClass(accordionMod, ['accordion__module--non-animated-expanded']);
    // Collapse Module
    } else {
      collapseModuleNonAnimated(accordionMod);
    }
  }

  // -------------------- Type Handler -------------------------------------- //
  var typeHandler = function(i) {
    switch(settings.type) {
      case 'animated':
        addClass(accordionModules[i], ['accordion__module--animated', 'accordion__module--animated-collapsed']);
        accordionBtns[i].addEventListener('click', moduleHandlerAnimated.bind(this, accordionModules[i]), false);
        break;
      case 'non-animated':
        addClass(accordionModules[i], ['accordion__module--non-animated-collapsed']);
        accordionBtns[i].addEventListener('click', moduleHandlerNonAnimated.bind(this, accordionModules[i]), false);
        break;
      default:
        console.log('Please select an animation type');
    }
  }

  // -------------------- Init loop ----------------------------------------- //
  for (var i = 0; i < accordionBtns.length; i++) {
      typeHandler(i);
  }

};

accordion({accordion__btn:'accordion__btn', accordion__module:'accordion__module', type:'animated', speed:.6, toggleOnOpen:true});
