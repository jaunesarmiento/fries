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

}());