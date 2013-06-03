(function(){

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

    e.preventDefault();
    
    if (!target) return;

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
      console.log('xhr.readyState is ' + xhr.readyState + '. Aborting XHR');
      xhr.onreadystatechange = function () {};
      xhr.abort();
    }

    // Setup a synchronous XHR. Setting the async parameter to false
    // solves the issue where xhr.responseText is empty even when the
    // xhr.status is 0.
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
      contents.addEventListener('webkitAnimationEnd', pushEnd);

      function pushEnd() {
        contents.removeEventListener('webkitAnimationEnd', pushEnd);
        contents.classList.remove(transition);
        container.parentNode.removeChild(container);
        if (callback) callback();
      }
    }

    if (/pop/.test(transition)) {
      contents.style.opacity = 1;
      container.classList.add('pop');
      container.addEventListener('webkitAnimationEnd', popEnd);

      function popEnd(){
        container.removeEventListener('webkitAnimationEnd', popEnd);
        container.parentNode.removeChild(container);
        if (callback) callback();
      }
    }

  };


  var onSuccess = function (xhr, options) {
    var data = parseXHR(xhr, options);

    if (!data.contents) {
      window.history.replaceState(null, '', '#');
      window.location.replace(options.url);
      return;
    }

    replaceContents(data.contents, options.container, options.transition, function () {
      cacheReplace({
        id         : options.id || +new Date(),
        url        : data.url,
        title      : data.title,
        timeout    : options.timeout,
        transition : options.transition
      }, options.id);
      triggerStateChange();
    });

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
        event.initCustomEvent(type, eventInitDict.detail, eventInitDict.bubbles, eventInitDict.cancelable);
        return event;
      };
    }

    var e = new CustomEvent('push', {
      detail: { state: getCached(doXHR.id) },
      bubbles: true,
      cancelable: true
    });

    window.dispatchEvent(e);
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
  window.addEventListener('click', handleTouch); // Using touchend causes page flickers during animation
  window.addEventListener('popstate', handlePopState);
}());