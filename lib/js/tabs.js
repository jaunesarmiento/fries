this.fries = this.fries || {};

(function () {

  // So we know if the user is trying to swipe
  fries.tabs_touchStarted = false;
  fries.tabs_isDragging = false;
  fries.tabs_touchEvent = null;

  var getTarget = function (target) {
    var i, tabs = document.querySelectorAll('.tab-fixed li a');
    for (; target && target !== document; target = target.parentNode) {
      for (i = tabs.length; i--;) { if (tabs[i] === target) return target; }
    }
  };

  var getTargetTabBody = function (target) {
    var i, tabItems = document.querySelectorAll('.tab-item');
    for (; target && target !== document; target = target.parentNode) {
      for (i = tabItems.length; i--;) { if (tabItems[i] === target) return target; }
    }
  };

  window.addEventListener('touchstart', function (e) {
    var tabBody = getTargetTabBody(e.target);

    console.log('foo');
    if (!tabBody || e.touches.length > 2) return;

    e.preventDefault();

    fries.tabs_touchStarted = true;
    fries.tabs_touchEvent = e;

    console.log('Tabs touch has started');
  });

  window.addEventListener('touchmove', function (e) {
    // var tabBody = getTargetTabBody(e.target);
    if (fries.tabs_touchStarted) {
      console.log('bar');

      var sliderItems = document.querySelectorAll('.tab-item'),
          s = sliderItems.length;

      while (s--) {
        var item = sliderItems[s],
            currentTransform = new WebKitCSSMatrix(window.getComputedStyle(item).webkitTransform),
            currentXPosition = currentTransform.m41,
            diff = fries.tabs_touchEvent.x - e.x;

        diff = -diff;
        console.log(diff);

        // item.classList.add('in-transition');
        fries.tab_isDragging = true;
        item.style.webkitTransform = 'translateX(' + (currentXPosition + diff) + 'px)';
        item.addEventListener('webkitTransitionEnd', dragEnd, false);
      }
    }

    fries.tabs_touchEvent = e;

    function dragEnd(e) {
      fries.tab_isDragging = false;
    }
  });

  window.addEventListener('touchend', function (e) {
    console.log('Tabs touch has ended');

    if (fries.tabs_touchStarted) {
      console.log(fries.tabs_touchStartEvent);
      console.log(e);

      var diff = fries.tabs_touchEvent.x - e.x;
      diff = (diff < 0) ? diff * -1 : diff;

      console.log(diff);

      if (diff >= 120) {
        if (e.x > fries.tabs_touchEvent.x) {
          console.log('Swipe right');
        }
        else {
          console.log('Swipe left');
        }
      }

      fries.tabs_touchStarted = false;
      fries.tabs_touchEvent = null;
    }
    else {
      return;
    }
  });

  window.addEventListener('touchend', function (e) {

    // console.log('Tabs touch has ended');

    var activeTab;
    var activeBody;
    var targetBody;
    var targetTab;
    var className     = 'active';
    var classSelector = '.' + className;
    var targetAnchor  = getTarget(e.target);

    if (!targetAnchor) return;

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