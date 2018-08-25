var accordion = function (settings) {

  // Variables
  var accordionBtns = document.getElementsByClassName(settings.accordion__btn);
  var accordionModule = document.getElementsByClassName(settings.accordion__module);

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

accordion({accordion__btn: 'accordion__btn', accordion__module: 'accordion__module'});
