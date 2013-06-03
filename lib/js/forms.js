(function() {

  var prettifyInput = function () {

    var inputs = document.querySelectorAll('.input-text'),
        i = inputs.length;

    while (i--) {
      // Iterate over all input elements and restyle them
      var el = inputs[i],
          wrapper = document.createElement('span');

      console.log(el);

      // Wrap the input element in span.input-pretty if we haven't yet
      if (!el.parentNode.classList.contains('input-pretty')) {
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

  window.addEventListener('load', prettifyInput, false);
  window.addEventListener('resize', prettifyInput, false);
  window.addEventListener('popstate', prettifyInput, false);
  window.addEventListener('push', prettifyInput, false);


}());