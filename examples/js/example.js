(function () {
  var init = function () {
    // Make sure the dialog is in the DOM
    if (document.querySelector('#my-dialog')) {
      var dialog = new fries.Dialog({
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

      document.querySelector('#open-dialog').addEventListener('touchend', function (e) {
        e.preventDefault();
        dialog.show();
      }, false);
    }

    document.querySelector('#show-toast').addEventListener('touchend', function () {
      var toast = new fries.Toast({ content: "Hi, I'm a Toast notification." });

    }, false);
  };

  window.addEventListener('push', init, false);
  window.addEventListener('popstate', init, false);

  var detect = function () {
    if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  };

  // To enable touch events on desktop
  // Remove this when building in PhoneGap
  if (detect) {
    window.onload = new FingerBlast('body');
  }
} ());
