this.fries = this.fries || {};

(function () {

  var Toast = function (options) {
    this._init(options);
  };

  Toast.duration = {
    "SHORT": 3000,
    "LONG": 5000
  };

  Toast.prototype = {

    _toast: null,

    _settings: {
      content: 'Please follow @jaunesarmiento on Twitter.',
      duration: Toast.duration.SHORT,
      position: 'bottom' // top, bottom, center
    },

    _init: function (options) {
      this._settings = fries.utils.merge(this._settings, options);

      if (this._settings.content === undefined) throw new Error('Error: missing paramter content.');

      // Create the toast element
      this._toast = document.createElement('div');
      this._toast.classList.add('toast');

      var toastContent = document.createElement('p');
      toastContent.classList.add('toast-message');

      // Set the Toast's position
      switch (this._settings.position) {
        case 'top'    : this._toast.style.top = '64px'; break;
        case 'center' : this._toast.style.bottom = '64px'; break;
        default       : this._toast.style.bottom = '64px';
      }

      this._toast.appendChild(toastContent);
      document.body.appendChild(this._toast);

      this.show();
    },

    setContent: function (content) {
      this._settings.content = content.trim();
      this._toast.querySelector('.toast-message').innerHTML = this._settings.content;
    },

    show: function () {
      this.setContent(this._settings.content);

      var toastWidth = getComputedStyle(this._toast.childNodes[0]).width;
      toastWidth = toastWidth.slice(0, toastWidth.length - 2);

      var left = (window.innerWidth / 2) - (toastWidth / 2);

      this._toast.style.marginLeft = left + 'px';
      this._toast.classList.add('on');

      setTimeout((function () {
        this._toast.classList.add('fade-in');
        setTimeout((this.hide).bind(this), this._settings.duration);
      }).bind(this), 50);
    },

    hide: function () {
      this._toast.addEventListener('webkitTransitionEnd', (function (e) {
        e.target.classList.remove('on');
        this.destroy(e.target);
      }).bind(this), false);

      this._toast.classList.remove('fade-in');
    },

    destroy: function (target) {
      document.body.removeChild(target);
    }

  };

  this.fries.Toast = Toast;

}());