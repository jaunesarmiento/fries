/**
 * Action bars
 */
!function () {

  // Action overflow
  window.checkActionOverflow = function () {

    var actionBars = document.querySelectorAll('.action-bar'),
        a = actionBars.length,
        cleanUp = document.querySelectorAll('.action-overflow'),
        c = cleanUp.length;

    // Clean up the existing action overflows
    while (c--) cleanUp[c].remove();

    if (window.innerWidth <= 480) {
      
      // Iterate over all action bars
      while (a--) {
        var actionButtons = actionBars[a].querySelectorAll('.actions .action');
      
        if (actionButtons.length > 2) {

          // Maintain the first item then replace the rest with an action overflow
          var first = actionButtons[0],
              i = actionButtons.length,
              overflowList = document.createElement('ol'), // This goes inside overflowListItem
              overflowListItem = document.createElement('li'),
              overflowButton = document.createElement('a'),
              overflowIcon = document.createElement('i');

          overflowList.setAttribute('reversed', 'reversed');
          overflowList.classList.add('action-overflow-list');
          overflowList.classList.add('spinner');

          // Hide the overflow
          while(i-- > 1) {
            actionButtons[i].classList.add('action-overflow-hidden');

            var li = document.createElement('li'),
                anchor = document.createElement('a');

            anchor.innerHTML = actionButtons[i].getAttribute('title');
            anchor.setAttribute('href', actionButtons[i].getAttribute('href'));
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

      attachSpinnerEvents();
    }
    else {
      // Iterate over all action bars
      while (a--) {
        var actionButtons = actionBars[a].querySelectorAll('.actions .action')
            i = actionButtons.length;

        while (i--) {
          actionButtons[i].classList.remove('action-overflow-hidden');
        }
      }
    }
  }
  
  window.addEventListener('resize', checkActionOverflow);
  window.addEventListener('load', checkActionOverflow);

}();

/**
 * Spinners
 */
!function(){

  window.attachSpinnerEvents = function () {

    var spinners = document.querySelectorAll('.toggle-spinner'),
      i = spinners.length;

    while (i--) {
      var s = spinners[i];
      
      s.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.target.nodeName === 'I') {
          e.target.parentNode.nextSibling.classList.toggle('active');  
          return;
        }

        e.target.nextSibling.classList.toggle('active');
      });
    }

    // Close spinner event handler
    document.addEventListener('click', function (e) {
      var els = document.querySelectorAll('.spinner'),
      o = els.length;
      while (o--) els[o].classList.remove('active');
    });
  }
  
  attachSpinnerEvents();

}();