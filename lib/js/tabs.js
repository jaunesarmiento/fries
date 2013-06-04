(function () {
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