this.fries = this.fries || {};

(function () {

  var Dialog = function (options) {
    this._init(options);
  };

  Dialog.prototype = {

    _dialog: null,

    _settings: {
      selector: null,
      callbackOk: function () {
        this.hide();
      },
      callbackCancel: function () {
        this.hide();
      }
    },

    _init: function (options) {
      this._settings = fries.utils.merge(this._settings, options);

      if (!this._settings.selector)
        throw new Error('Missing parameter: selector');

      this._dialog = document.querySelector(this._settings.selector);

      // Throw an error if the element isn't on the DOM
      if (!this._dialog) {
        throw new Error('Could not find ' + this._settings.selector + ' in the DOM');
      }

      this.attachEventHandlers();
    },

    attachEventHandlers: function () {
      // Attach the event handlers
      this._dialog.querySelector('.dialog-ok-button').addEventListener('touchend', (this._settings.callbackOk).bind(this), false);
      this._dialog.querySelector('.dialog-cancel-button').addEventListener('touchend', (this._settings.callbackCancel).bind(this), false);
    },

    center: function (target) {
      var computedStyle = getComputedStyle(target),
      width = computedStyle.width,
      height = computedStyle.height;

      width = width.slice(0, width.length - 2);
      height = height.slice(0, height.length - 2);

      var left = (window.innerWidth / 2) - (width / 2),
          top = (window.innerHeight / 2) - (height / 2);

      target.style.marginLeft = left + 'px';
      target.style.marginTop = top + 'px';
    },

    show: function () {
      var that = this;
      var self = this._dialog;
      this.center(self);

      self.parentNode.classList.add('on'); // Shows .dialogs (overlay)

      self.parentNode.removeEventListener('webkitTransitionEnd');
      self.parentNode.addEventListener('webkitTransitionEnd', onTransitionEnd, false);

      setTimeout((function () {
        this._dialog.parentNode.classList.add('fade-in'); // Sets opacity to 1
      }).bind(this), 200);

      function onTransitionEnd() {
        self.parentNode.removeEventListener('webkitTransitionEnd', onTransitionEnd);
        self.classList.add('on');
        self.classList.add('push');

        document.querySelector('.dialogs').addEventListener('touchend', (function(e) {
          if (e.target === document.querySelector('.dialogs')) {
            console.log('Hiding the dialog');
            this.hide();
          }
        }).bind(that), false);
      }
    },

    hide: function () {
      var self = this._dialog;

      self.classList.remove('push');
      self.classList.remove('on');
      self.classList.add('pop');

      self.addEventListener('webkitAnimationEnd', onAnimationEnd, false);

      document.querySelector('.dialogs').removeEventListener('touchend');

      function onAnimationEnd() {
        self.removeEventListener('webkitAnimationEnd', onAnimationEnd);
        self.classList.remove('pop');
        self.parentNode.classList.remove('fade-in');
        self.parentNode.addEventListener('webkitTransitionEnd', onTransitionEnd);
      }

      function onTransitionEnd() {
        self.parentNode.removeEventListener('webkitTransitionEnd', onTransitionEnd);
        self.parentNode.classList.remove('on');
      }

      this.destroy();
    },

    destroy: function () {

    }
  };

  this.fries.Dialog = Dialog;

}());