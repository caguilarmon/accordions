/**
* Mr Accordion library - Vanilla ES5. (c) 2018 Carlos Aguilar Montoya
* A library to create animated or non animated accordions with different settings.
*
* @param {Object} settings - Settings for the accordion
* @param {Object} settings.accordion__btn - Html tag's CSS class
* @param {Object} settings.accordion__module - Html tag's CSS class
* @param {string} settings.type - 'animated' or 'non-animated'
* @param {number} [settings.speed=0.4] - Speed number
* @param {boolean} [settings.toggleOnOpen=false] - If other non clicked modules should collapse
*/

var accordion = function (settings) {

  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModules = document.getElementsByClassName(settings.accordion__module);

  /**
  * Adds CSS class or classes to element
  *
  * @param {Object} elem - Html tag
  * @param {array} accordionClass - CSS class/classes
  */
  var addClass = function(elem, accordionClass) {
    for (var i = 0; i < accordionClass.length; i++) {
      elem.classList.add(accordionClass[i]);
    }
  }

  /**
  * Removes CSS class from element
  *
  * @param {Object} elem - Html tag
  * @param {string} accordionClass - CSS class
  */
  var removeClass = function(elem, accordionClass) {
    elem.classList.remove(accordionClass);
  }

  /**
  * Checks if input is strictly a number
  *
  * @param {*} val - Value to check
  */
  var isValueNumeric = function(val) {
    return Number(val) === val;
  }

  /**
  * Gets the elements' max-height property
  *
  * @param {Object} accordionMod - Html tag
  */
  var getModuleMaxHeight = function(accordionMod) {
    return parseFloat(window.getComputedStyle(accordionMod, null).getPropertyValue('max-height'));
  }

  /**
  * Sets the transition speed for the element parameter based on the init settings
  *
  * @param {Object} elem - Html tag
  */
  var setTransitionSpeed = function(elem) {
      elem.style.transitionDuration = settings.speed + 's';
  }

  /**
  * Collapses Animated Module (Adds collapse CSS classes and properties)
  *
  * @param {Object} accordionMod - Html tag
  */
  var collapseModuleAnimated = function(accordionMod) {
    accordionMod.style.maxHeight = 0;
    removeClass(accordionMod, 'accordion__module--animated-expanded');
    addClass(accordionMod, ['accordion__module--animated-collapsed']);
  }

  /**
  * Collapses Non Animated Module (Adds collapse CSS classes)
  *
  * @param {Object} accordionMod - Html tag
  */
  var collapseModuleNonAnimated = function(accordionMod) {
    removeClass(accordionMod, 'accordion__module--non-animated-expanded');
    addClass(accordionMod, ['accordion__module--non-animated-collapsed']);
  }

  /**
  * Checks and collapses other expanded modules than the clicked one
  *
  * @param {Object} accordionMod - Html tag
  */
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

  /**
  * Handles the animated modules' expand and collapse overall functionality
  *
  * @param {Object} accordionMod - Html tag
  */
  var moduleHandlerAnimated = function(accordionMod) {

    var moduleMaxHeight = getModuleMaxHeight(accordionMod);

    /* Expands Module
    */
    if (moduleMaxHeight === 0){
      if (settings.toggleOnOpen) {
        checkAndCollapseOtherExpandedModules(accordionMod);
      }
      if (isValueNumeric(settings.speed)) {
        setTransitionSpeed(accordionMod);
      }
      accordionMod.style.maxHeight = accordionMod.scrollHeight + 'px';
      accordionMod.addEventListener('transitionend', isModuleExpanded, false);
      /* Set overflow to auto at the end of the expand,
      * to add a scroll if the window is resized
      */
      function isModuleExpanded() {
        if(getModuleMaxHeight(accordionMod) !== 0){
          removeClass(accordionMod, 'accordion__module--animated-collapsed');
          addClass(accordionMod, ['accordion__module--animated-expanded']);
        }
      }
    /* Collapses Module
    */
    } else {
      collapseModuleAnimated(accordionMod);
    }
  }

  /**
  * Handles the Non animated modules' expand and collapse overall functionality
  *
  * @param {Object} accordionMod - Html tag
  */
  var moduleHandlerNonAnimated = function(accordionMod) {

    var displayValue = window.getComputedStyle(accordionMod, null).getPropertyValue('display');

    /* Expands Module
    */
    if (displayValue === 'none') {
      if (settings.toggleOnOpen) {
        checkAndCollapseOtherExpandedModules(accordionMod);
      }
      removeClass(accordionMod, 'accordion__module--non-animated-collapsed');
      addClass(accordionMod, ['accordion__module--non-animated-expanded']);
      /* Collapses Module
      */
    } else {
      collapseModuleNonAnimated(accordionMod);
    }
  }

  /**
  * Handles the type of accordion from the settings type when initialized, can be
  * Animated or Non Animated.
  * Adds the proper CSS classes and listeners.
  *
  * @param {number} i - Index for accordion modules
  */
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

  /**
  * Init loop to go through all the accordions buttons/modules
  */
  for (var i = 0; i < accordionBtns.length; i++) {
      typeHandler(i);
  }

};
