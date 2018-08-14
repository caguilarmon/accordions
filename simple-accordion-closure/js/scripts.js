(function accordionHandler() {

  // Variables
  var accordionBtns = document.getElementsByClassName('accordion__btn');
  var accordionModule = document.getElementsByClassName('accordion__module');

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

})();
