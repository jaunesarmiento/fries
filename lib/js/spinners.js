!function(){

  // Checks whether the event target is a .toggle-spinner button
  var findTarget = function (target) {
    var i, toggles = document.querySelectorAll('.toggle-spinner');
    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) { if (toggles[i] === target) return target; }
    }
  };

  // Returns the event target if it's a .toggle-spinner button
  var getTarget = function (e) {
    var target = findTarget(e.target);
    if (!target) return;
    return target;
  };

  // Checks whether the event target is a .toggle-spinner button
  var findSpinnerTarget = function (target) {
    var i, toggles = document.querySelectorAll('.spinner-item');
    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) { if (toggles[i] === target) return target; }
    }
  };

  // Returns the event target if it's a spinner item
  var getSpinnerTarget = function (e) {
    var target = findSpinnerTarget(e.target);
    if (!target) return;
    return target;
  }

  // Event handler to show/hide the spinner
  var handleTouch = function (e) {
    var target = getTarget(e);
    if (!target) return;
    showSpinner(target);
  };

  var showSpinner = function(target) {
    var spinner = target.parentNode.querySelectorAll('.spinner')[0];
    
    if (!spinner.classList.contains('active')) spinner.style.display = 'block';

    setTimeout(function () { 
      spinner.classList.toggle('active');
      spinner.addEventListener('webkitTransitionEnd', popEnd);
    }, 20); // Might be better to get the timeout from the CSS transition
    
    function popEnd () {
      if (!spinner.classList.contains('active')) spinner.style.display = 'none';
    };
  }

  // Attach event handler to close the spinner unless target is a spinner item
  document.addEventListener('touchend', function (e) {
    if (!getSpinnerTarget(e) && !getTarget(e)) {
      var spinners = document.querySelectorAll('.spinner'),
          i = spinners.length;
      while (i--) {
        spinners[i].classList.remove('active');
      }
    }
  });

  // Attach the event handler
  window.addEventListener('touchend', handleTouch, false);

}();