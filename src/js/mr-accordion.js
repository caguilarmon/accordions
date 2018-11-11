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

  var accordionBtns = $(settings.accordion__btn);
  var accordionModules = $(settings.accordion__module);

  /**
  * Checks if input is strictly a number
  *
  * @param {*} val - Value to check
  */
  var isValueNumeric = function(val) {
    return Number(val) === val;
  }

  /**
  * Gets the element's max-height property
  *
  * @param {Object} accordionMod - Html tag
  */
  var getModuleMaxHeight = function(accordionMod) {
    return parseFloat($(accordionMod).css('max-height'));
  }

  /**
  * Sets the transition speed for the element parameter based on the init settings
  *
  * @param {Object} elem - Html tag
  */
  var setTransitionSpeed = function(elem) {
      $(elem).css('transition-duration', settings.speed + 's')
  }

  /**
  * Collapses Animated Module (Adds collapse CSS classes and properties)
  *
  * @param {Object} accordionMod - Html tag
  */
  var collapseModuleAnimated = function(accordionMod) {
    $(accordionMod).css('max-height', 0);
    $(accordionMod).removeClass('accordion__module--animated-expanded')
    .addClass('accordion__module--animated-collapsed');
  }

  /**
  * Collapses Non Animated Module (Adds collapse CSS classes)
  *
  * @param {Object} accordionMod - Html tag
  */
  var collapseModuleNonAnimated = function(accordionMod) {
    $(accordionMod).removeClass('accordion__module--non-animated-expanded')
    .addClass('accordion__module--non-animated-collapsed');
  }

  /**
  * Checks and collapses other expanded modules than the clicked one
  *
  * @param {Object} accordionMod - Html tag
  */
  var checkAndCollapseOtherExpandedModules = function(accordionMod) {
    $.each(accordionModules, function(i, accMod){
      if (!(accordionModules[i] === accordionMod)) {
        if (settings.type === 'animated') {
          if (getModuleMaxHeight(accordionModules[i]) !== 0) {
            collapseModuleAnimated(accordionModules[i]);
          }
        } else {
          var displayValue = $(accordionModules[i]).css('display');
          if (displayValue === 'block') {
            collapseModuleNonAnimated(accordionModules[i]);
          }
        }
      }
    })
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
      $(accordionMod).css('max-height', accordionMod.scrollHeight + 'px');
      accordionMod.addEventListener('transitionend', isModuleExpanded, false);
      /* Set overflow to auto at the end of the expand,
      * to add a scroll if the window is resized
      */
      function isModuleExpanded() {
        if(getModuleMaxHeight(accordionMod) !== 0){
          $(accordionMod).removeClass('accordion__module--animated-collapsed')
          .addClass('accordion__module--animated-expanded');
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

    var displayValue = $(accordionMod).css('display');

    /* Expands Module
    */
    if (displayValue === 'none') {
      if (settings.toggleOnOpen) {
        checkAndCollapseOtherExpandedModules(accordionMod);
      }
      $(accordionMod).removeClass('accordion__module--non-animated-collapsed')
      .addClass('accordion__module--non-animated-expanded');
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
        $(accordionModules[i]).addClass('accordion__module--animated accordion__module--animated-collapsed');
        $(accordionBtns[i]).click(function(event) {
          moduleHandlerAnimated(accordionModules[i]);
        });
        break;
      case 'non-animated':
        $(accordionModules[i]).addClass('accordion__module--non-animated-collapsed');
        $(accordionBtns[i]).click(function(event) {
          moduleHandlerNonAnimated(accordionModules[i]);
        });
        break;
      default:
        console.log('Please select an animation type');
    }
  }

  /**
  * Init loop to go through all the accordions' buttons/modules
  */
  $.each(accordionBtns, function(i, accordionBtn){
    typeHandler(i);
  });

};
