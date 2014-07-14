(function () {

  // Action overflow
  var checkActionOverflow = function () {

    var actionBars = document.querySelectorAll('.action-bar'),
        a = actionBars.length,
        cleanUp = document.querySelectorAll('.action-overflow'),
        c = cleanUp.length;

    // Clean up the existing action overflows
    while (cleanUp && c--) cleanUp[c].parentNode.removeChild(cleanUp[c]);

    // Do this only when the screen width is below or equal to 480 pixels
    if (window.innerWidth <= 480) {
      
      // Iterate over all action bars
      while (a--) {
        var actions = actionBars[a].querySelector('.actions'),
            actionButtons = actionBars[a].querySelectorAll('.actions .action');
      
        if (actionButtons.length > 2 && actions.getAttribute('data-overflow') !== "false") {

          // Maintain the first item then replace the rest with an action overflow
          var first = actionButtons[0],
              i = actionButtons.length,
              overflowList = document.createElement('ol'), // This goes inside overflowListItem
              overflowListItem = document.createElement('li'),
              overflowButton = document.createElement('a'),
              overflowIcon = document.createElement('i');

          // Reverse the list since we're iterating it backwards
          overflowList.setAttribute('reversed', 'reversed');

          overflowList.classList.add('action-overflow-list');
          overflowList.classList.add('spinner');

          // Hide the overflow
          for (var x = 1; x < i; x++) {
            actionButtons[x].parentNode.classList.add('action-overflow-hidden');

            var li = document.createElement('li'),
                anchor = document.createElement('a');

            anchor.innerHTML = actionButtons[x].getAttribute('title');
            anchor.setAttribute('href', actionButtons[x].getAttribute('href'));

            // Copy over all stack-related data attributes
            anchor.setAttribute('data-transition', actionButtons[x].getAttribute('data-transition'));
            anchor.setAttribute('data-timeout', actionButtons[x].getAttribute('data-timeout'));
            anchor.setAttribute('data-ignore', actionButtons[x].getAttribute('data-ignore'));

            li.classList.add('spinner-item');
            li.appendChild(anchor);
            overflowList.appendChild(li);
          }

          // Add the action overflow button
          overflowButton.classList.add('action');
          overflowButton.classList.add('action-overflow-icon');
          overflowButton.classList.add('toggle-spinner');
          overflowButton.appendChild(overflowIcon);

          overflowListItem.classList.add('action-overflow');
          overflowListItem.appendChild(overflowButton);
          overflowListItem.appendChild(overflowList);

          actionBars[a].querySelector('.actions').appendChild(overflowListItem);
        }
      }
      
    }
    else {
      // Iterate over all action bars

      while (a--) {
        var ab = actionBars[a].querySelectorAll('.actions .action'),
            l = ab.length;

        // Un-overflow the action buttons
        while (l--) {
          ab[l].parentNode.classList.remove('action-overflow-hidden');
        }
      }
    }
  };

  // Attach the event handlers
  window.addEventListener('load', checkActionOverflow, false);
  window.addEventListener('resize', checkActionOverflow, false);
  window.addEventListener('popstate', checkActionOverflow, false);
  window.addEventListener('push', checkActionOverflow, false);

}());;this.fries = this.fries || {};

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

}());;(function() {

  var prettifyInput = function () {
    var inputs = document.querySelectorAll('.input-text'),
        i = inputs.length;

    while (i--) {
      // Iterate over all input elements and restyle them
      var el = inputs[i],
          wrapper = document.createElement('span');

      // Wrap the input element in span.input-pretty if we haven't yet
      if (!el.parentNode.classList.contains('input-pretty')) {

        if (el.classList.contains('flex1')) {
          wrapper.classList.add('flex1');
          el.classList.remove('flex1');
        }
        else if (el.classList.contains('flex2')) {
          wrapper.classList.add('flex2');
          el.classList.remove('flex2');
        }
        else if (el.classList.contains('flex3')) {
          wrapper.classList.add('flex3');
          el.classList.remove('flex3');
        }

        wrapper.classList.add('input-pretty');
        el.parentNode.insertBefore(wrapper, el);
        el.parentNode.removeChild(el);
        wrapper.appendChild(el);

        // Add the focus/blur event handlers so it matches the style of the input element
        el.addEventListener('focus', toggleFocus, false);
        el.addEventListener('blur', toggleFocus, false);
      }
    }
  };

  var toggleFocus = function (e) {
    var el = e.currentTarget;
    el.parentNode.classList.toggle('focus');
  };

  window.addEventListener('load', prettifyInput);
  window.addEventListener('resize', prettifyInput, false);
  window.addEventListener('popstate', prettifyInput, false);
  window.addEventListener('push', prettifyInput, false);
}());;(function(){

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

}());;(function(){

  var isScrolling;
  var maxCacheLength = 20;
  var cacheMapping   = sessionStorage;
  var domCache       = {};

  var cacheReplace = function (data, updates) {
    doXHR.id = data.id;
    if (updates) data = getCached(data.id);
    cacheMapping[data.id] = JSON.stringify(data);
    window.history.replaceState(data.id, data.title, data.url);
    domCache[data.id] = document.body.cloneNode(true);
  };

  var cachePush = function () {
    var id = doXHR.id;

    var cacheForwardStack = JSON.parse(cacheMapping.cacheForwardStack || '[]');
    var cacheBackStack    = JSON.parse(cacheMapping.cacheBackStack    || '[]');

    cacheBackStack.push(id);

    while (cacheForwardStack.length)               delete cacheMapping[cacheForwardStack.shift()];
    while (cacheBackStack.length > maxCacheLength) delete cacheMapping[cacheBackStack.shift()];

    window.history.pushState(null, '', cacheMapping[doXHR.id].url);

    cacheMapping.cacheForwardStack = JSON.stringify(cacheForwardStack);
    cacheMapping.cacheBackStack    = JSON.stringify(cacheBackStack);
  };

  var cachePop = function (id, direction) {
    var forward           = direction == 'forward';
    var cacheForwardStack = JSON.parse(cacheMapping.cacheForwardStack || '[]');
    var cacheBackStack    = JSON.parse(cacheMapping.cacheBackStack    || '[]');
    var pushStack         = forward ? cacheBackStack    : cacheForwardStack;
    var popStack          = forward ? cacheForwardStack : cacheBackStack;

    if (doXHR.id) pushStack.push(doXHR.id);
    popStack.pop();

    cacheMapping.cacheForwardStack = JSON.stringify(cacheForwardStack);
    cacheMapping.cacheBackStack    = JSON.stringify(cacheBackStack);
  };

  var getCached = function (id) {
    return JSON.parse(cacheMapping[id] || null) || {};
  };

	var handleTouch = function (e) {
    var target = getTarget(e);

    if (!target) return;

    e.preventDefault();

    if (target.getAttribute('data-transition') == 'pop' && !target.classList.contains('up')) {
      window.history.go(-1);
      triggerStateChange();
      return;
    }

    doXHR({
      url: target.getAttribute('href'),
      hash : target.hash,
      container: '.page',
      timeout: target.getAttribute('data-timeout'),
      transition: target.getAttribute('data-transition')
    });

  };

  var handlePopState = function (e) {
    var activeObj;
    var activeDom;
    var direction;
    var transition;
    var transitionFrom;
    var transitionFromObj;
    var id = e.state;

    if (!id || !cacheMapping[id]) return;

    direction = doXHR.id < id ? 'forward' : 'back';

    cachePop(id, direction);

    activeObj = getCached(id);
    activeDom = domCache[id];

    if (activeObj.title) document.title = activeObj.title;

    if (direction == 'back') {
      transitionFrom    = JSON.parse(direction == 'back' ? cacheMapping.cacheForwardStack : cacheMapping.cacheBackStack);
      transitionFromObj = getCached(transitionFrom[transitionFrom.length - 1]);
    } else {
      transitionFromObj = activeObj;
    }

    if (direction == 'back' && !transitionFromObj.id) return doXHR.id = id;

    transition = direction == 'back' ? 'pop' : transitionFromObj.transition;

    if (!activeDom) {
      return doXHR({
        id         : activeObj.id,
        url        : activeObj.url,
        title      : activeObj.title,
        timeout    : activeObj.timeout,
        transition : transition,
        ignorePush : true
      });
    }

    replaceContents(
      (activeObj.contents || activeDom.querySelector('.page')).cloneNode(true),
      document.querySelector('.page'),
      transition
    );

    doXHR.id = id;
  };

  var doXHR = function(options) {
    var xhr = doXHR.xhr;

    options.container = document.querySelector(options.container);
    if (!options.container) options.container = document.querySelector('.page');

    if (xhr && xhr.readyState < 4) {
      xhr.onreadystatechange = function () {};
      xhr.abort();
    }

    xhr = new XMLHttpRequest();
    xhr.open('GET', options.url, false);
    xhr.setRequestHeader('X-DOCUMENT', 'true');

    xhr.onreadystatechange = function () {
      if (options._timeout) clearTimeout(options._timeout);
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) onSuccess(xhr, options);
        else onError(options.url);
      }
    };

    if (!doXHR.id) {
      cacheReplace({
        id         : +new Date(),
        url        : options.url,
        title      : document.title,
        timeout    : options.timeout,
        transition : null
      });
    }

    if (options.timeout) {
      options._timeout = setTimeout(function () {  xhr.abort('timeout'); }, options.timeout);
    }

    xhr.send();

    if (xhr.readyState && !options.ignorePush) cachePush();
  };

  var replaceContents = function (contents, container, transition, callback) {
    // If there's no set transition, just replace the contents of the container
    if (!transition) {
      container.innerHTML = contents.innerHTML;
    }
    else {
      // Else, we'll be needing to animate the transition so keep the container for now
      container.parentNode.insertBefore(contents, container);
    }

    // If there's no set transition, do the callback, there's no use continuing
    if (!transition && callback) callback();

    if (/push/.test(transition)) {
      contents.classList.add(transition);
      container.classList.add('fade');
      contents.addEventListener('webkitAnimationEnd', onPushAnimationEnd, false);

      // Causes a jshint warning. Use --force to ignore
      function onPushAnimationEnd() {
        contents.removeEventListener('webkitAnimationEnd', onPushAnimationEnd, false);
        contents.classList.remove(transition);
        if (container.parentNode) container.parentNode.removeChild(container);
        if (callback) callback();
      }
    }

    if (/pop/.test(transition)) {
      contents.style.opacity = 1;
      container.classList.add('pop');

      container.addEventListener('webkitAnimationEnd', onPopAnimationEnd, false);

      // Causes a jshint warning. Use --force to ignore
      function onPopAnimationEnd() {
        container.classList.add('hidden');
        container.removeEventListener('webkitAnimationEnd', onPopAnimationEnd, false);
        container.parentNode.removeChild(container);
        if (callback) callback();
      }
    }
  };

  var pushCallback = function (data, options) {
      cacheReplace({
        id         : options.id || +new Date(),
        url        : data.url,
        title      : data.title,
        timeout    : options.timeout,
        transition : options.transition
      }, options.id);

      triggerStateChange();
  };

  var onSuccess = function (xhr, options) {
    var data = parseXHR(xhr, options);

    if (!data.contents) {
      window.history.replaceState(null, '', '#');
      window.location.replace(options.url);
      return;
    }

    replaceContents(data.contents, options.container, options.transition, pushCallback(data, options));

    if (data.title) document.title = data.title;

    if (!options.ignorePush && window._gaq) _gaq.push(['_trackPageview']); // Google Analytics
    if (!options.hash) return;
  };

  var onError = function (url) {
    throw new Error('Could not get ' + url);
  };

  var parseXHR = function (xhr, options) {
    var data = {};
    var responseText = xhr.responseText;

    data.url = options.url;

    if (!responseText) return data;

    if (/<html/i.test(responseText)) {
      head           = document.createElement('div');
      body           = document.createElement('div');
      head.innerHTML = responseText.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
      body.innerHTML = responseText.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0];
    } else {
      head           = body = document.createElement('div');
      head.innerHTML = responseText;
    }

    // Get the title from the page
    data.title = head.querySelector('title');
    data.title = data.title && data.title.innerText.trim();

    // Get the contents of the page
    data.contents = body.querySelector('.page');

    return data;
  };

  var triggerStateChange = function () {
    // Fix from https://github.com/maker/ratchet/issues/101 where CustomEvent is undefined
    if (typeof CustomEvent === 'undefined') {
      CustomEvent = function(type, eventInitDict) {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
        return event;
      };
    }

    var e = new CustomEvent('push', {
      detail: { state: getCached(doXHR.id) },
      bubbles: true,
      cancelable: true
    });

    setTimeout(function () {
      window.dispatchEvent(e);
    }, 200);
  };

  var findTarget = function (target) {
    var i, toggles = document.querySelectorAll('a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) { if (toggles[i] === target) return target; }
    }
  };

  var getTarget = function (e) {
    var target = findTarget(e.target);

    if ( !target || e.which > 1 || e.metaKey || e.ctrlKey || isScrolling || location.protocol !== target.protocol || location.host !== target.host || !target.hash && /#/.test(target.href) || target.hash && target.href.replace(target.hash, '') === location.href.replace(location.hash, '') || target.getAttribute('data-ignore') == 'true') return;
    return target;
  };

  // Attach event handlers
  window.addEventListener('touchstart', function () { isScrolling = false; });
  window.addEventListener('touchmove', function () { isScrolling = true; });
  window.addEventListener('touchend', handleTouch);
  window.addEventListener('popstate', handlePopState);
}());
;(function () {
  var getTarget = function (target) {
    var i, tabs = document.querySelectorAll('.tab-fixed li a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = tabs.length; i--;) { if (tabs[i] === target) return target; }
    }
  };

  window.addEventListener('touchend', function (e) {

    var activeTab;
    var activeBody;
    var targetBody;
    var targetTab;
    var className     = 'active';
    var classSelector = '.' + className;
    var targetAnchor  = getTarget(e.target);

    if (!targetAnchor) return;
    
    e.preventDefault();

    e.preventDefault();

    targetTab = targetAnchor.parentNode;
    activeTab = targetTab.parentNode.querySelector(classSelector);

    // Highlight the target tab
    if (activeTab) activeTab.classList.remove(className);
    targetTab.classList.add(className);

    // If the target body doesn't exist, don't do anything
    targetBody = document.querySelector(targetAnchor.hash);
    if (!targetBody) return;

    // Set the target body as active
    activeBody = targetBody.parentNode.querySelector(classSelector);
    if (activeBody) activeBody.classList.remove(className);
    targetBody.classList.add(className);

    // Look for the index of the target and active bodies
    var sliderItems = document.querySelectorAll('.tab-item'),
        s = sliderItems.length;
    while (s--) {
      // Show the hidden bodies and set their initial position
      sliderItems[s].classList.add('in-transition');
      sliderItems[s].style.left = (s * 100) + "%";
      if (sliderItems[s] == targetBody) targetIndex = s;
      if (sliderItems[s] == activeBody) activeIndex = s;
    }
    
    // Slide the active body into position
    s = sliderItems.length;
    setTimeout(function () {
      while (s--) {
        sliderItems[s].style.webkitTransform = 'translateX('+ ((targetIndex === 0) ? 0 : '-' + (targetIndex * 100)) +'%)';
        sliderItems[s].addEventListener('webkitTransitionEnd', slideEnd);
      }
    }, 50); // To account for lag when adding the .in-transition class

    function slideEnd (e) {
      // Hide the inactive bodies
      e.target.classList.remove('in-transition');
    }

  });
}());
;this.fries = this.fries || {};

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
        case 'top'    : this._toast.style.top = '72px'; break;
        case 'center' : break;
        default       : this._toast.style.bottom = '72px';
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

}());;this.fries = this.fries || {};

(function () {

  var utils = {

    merge: function (obj1, obj2) {
      var obj3 = {},
          attrname;
      for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    }

  };

  fries.utils = utils;

}());
