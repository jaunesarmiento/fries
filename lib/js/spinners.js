!function(){

  window.attachSpinnerEvents = function () {

    var spinners = document.querySelectorAll('.toggle-spinner'),
      i = spinners.length;

    while (i--) {
      var s = spinners[i];
      
      s.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.target.nodeName === 'SPAN') {
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