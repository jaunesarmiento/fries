(function() {

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

  window.addEventListener('load', prettifyInput, false);
  window.addEventListener('resize', prettifyInput, false);
  window.addEventListener('popstate', prettifyInput, false);
  window.addEventListener('push', prettifyInput, false);


}());