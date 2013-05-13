!function(){

  window.attachSpinnerEvents = function () {

    var spinners = document.querySelectorAll('.toggle-spinner'),
      i = spinners.length;

    while (i--) {
      
      var s = spinners[i];
      
      s.addEventListener('click', function (e) {

        e.preventDefault();
        e.stopPropagation();
        
        var target = e.target;

        if (e.target.nodeName === 'I') {
          target = e.target.parentNode;
        }

        var spinner = target.parentNode.querySelectorAll('.spinner')[0];
        spinner.classList.toggle('active');
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