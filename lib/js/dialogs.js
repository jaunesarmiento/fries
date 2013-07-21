this.fries = this.fries || {};

(function () {
  
  var Dialog = function (options) {
    this.init(options);
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

    init: function (options) {
      this._settings = this.merge(this._settings, options);

      if (!this._settings.selector) 
        throw new Error('Missing parameter: selector');
      
      this._dialog = document.querySelector(this._settings.selector);

      // Throw an error if the element isn't on the DOM
      if (!this._dialog) 
        throw new Error('Could not find an element in the DOM using: ' + this._settings.selector);

      // Attach the event handlers
      this._dialog.querySelector('.dialog-ok-button').addEventListener('click', (this._settings.callbackOk).bind(this), false);
      this._dialog.querySelector('.dialog-cancel-button').addEventListener('click', (this._settings.callbackCancel).bind(this), false);
    },

    show: function () {
      var self = this._dialog;

      self.parentNode.classList.add('on'); // Shows .dialogs (overlay)
      self.parentNode.removeEventListener('webkitTransitionEnd');
      self.parentNode.addEventListener('webkitTransitionEnd', onTransitionEnd, false);

      function onTransitionEnd() {
        self.parentNode.removeEventListener('webkitTransitionEnd', onTransitionEnd);
        self.classList.add('on');
        self.classList.add('push');
      }
    },

    hide: function () {
      var self = this._dialog;

      self.classList.remove('push');
      self.classList.remove('on');
      self.classList.add('pop');
      
      self.addEventListener('webkitAnimationEnd', onAnimationEnd, false);

      function onAnimationEnd() {
        self.removeEventListener('webkitAnimationEnd', onAnimationEnd);
        self.classList.remove('pop');
        self.parentNode.classList.remove('on');
        self.parentNode.addEventListener('webkitTransitionEnd', onTransitionEnd);
      }

      function onTransitionEnd() {
        self.parentNode.removeEventListener('webkitTransitionEnd', onTransitionEnd);
      }

      this.destroy();
    },

    destroy: function () {
            
    },

    merge: function (obj1, obj2) {
      var obj3 = {},
          attrname;
      for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    }

  };

  this.fries.Dialog = Dialog;

}());