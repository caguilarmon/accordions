var accordion = function ({accordionBtnClass, accordionModuleClass}) {

  // Variables
  var accordionBtns = document.getElementsByClassName(accordionBtnClass);
  var accordionModule = document.getElementsByClassName(accordionModuleClass);

  for (var i = 0; i < accordionBtns.length; i++) {
      accordionBtns[i].addEventListener('click', moduleHandlerCallback(i), false);
  }

  function moduleHandlerCallback(moduleIndex) {
    return function() {
      moduleHandler(moduleIndex);
    };
  }

  function moduleHandler(i) {
    if (accordionModule[i].style.display==='block') {
      accordionModule[i].style.display='none';
    } else {
      accordionModule[i].style.display='block';
    }
  }

};

accordion({accordionBtnClass: 'accordion__btn', accordionModuleClass:'accordion__module'});
