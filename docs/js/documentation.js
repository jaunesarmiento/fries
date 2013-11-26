$(function () {
  var init = function () {
    // Make sure the dialog is in the DOM
    if (document.querySelector('#my-dialog')) {
      window.dialog = new fries.Dialog({
        selector: '#my-dialog',
        callbackOk: function () {
          var toast = new fries.Toast({
            content: "Pressed OK",
            duration: fries.Toast.duration.SHORT
          });

          this.hide(); // this refers to the dialog
        },
        callbackCancel: function () {
          var toast = new fries.Toast({
            content: "Pressed Cancel",
            duration: fries.Toast.duration.SHORT
          });

          this.hide(); // this refers to the dialog
        }
      });

      document.querySelector('#show-dialog').addEventListener('touchend', function () {
        dialog.show();
      }, false);
    }

    if (document.querySelector('#show-toast')) {
      document.querySelector('#show-toast').addEventListener('touchend', function () {
        var toast = new fries.Toast({ content: "Hi, I'm a Toast notification." });

      }, false);
    }

    prettyPrint();

    $('.open-link').on('touchend', function (e) {
      var url = $(this).attr('href'),
          target = $(this).attr('target');

      if (target == '_blank') {
        window.open(url);
      }
      else {
        window.location.href = url;
      }
    });

    // To enable touch events on desktop
    // Remove this when building in PhoneGap
    if ($('.nexus-content').length > 0 && $('#nexus').css('display') != 'none') new FingerBlast('.nexus-content');

    if ($('.inner-content').length > 0) new FingerBlast('.inner-content');
  };

  if (!(/WebKit/.test(navigator.userAgent))) {
    $('.non-webkit-notice').show();

    $('.non-webkit-notice').on('click', function () {
      $(this).addClass('fade');
    });
    $('.docs-content').on('scroll', function () {
      $('.non-webkit-notice').addClass('fade');
    });
  }
  init();
});

(function(){

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
  };

  // Event handler to show/hide the spinner
  var handleTouch = function (e) {
    var target = getTarget(e);
    if (!target) return;
    else e.preventDefault();
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
    }
  };

  // Attach event handler to close the spinner unless target is a spinner item
  document.addEventListener('click', function (e) {
    if (!getSpinnerTarget(e) && !getTarget(e)) {
      var spinners = document.querySelectorAll('.spinner'),
          i = spinners.length;
      while (i--) {
        spinners[i].classList.remove('active');
      }
    }
  });

  // Attach the event handler
  window.addEventListener('click', handleTouch, false);

}());
