$(function() {

  window.debug = true;

  var scroller;
  var $win;
  var $doc;
  var $bod;
  var galaxy;
  var contentSection;
  var topCache;
  var windowWidth;
  var eventListeners;
  var pageHeight;
  var windowHeight;
  var footerHeight;
  var currentActive;
  var $toggleSpinner;
  var $navComponents;

  prettyPrint();

  var initialize = function  () {
    attachIScroll();

    $win = $(window);
    $doc = $(document);
    $bod = $(document.body);

    $toggleSpinner = $('.toggle-nav');
    $navComponents = $('.nav-components');
    
    galaxy = galaxy || $('.galaxy');
    contentSection = $('.component');
    topCache = contentSection.map(function () { return $(this).offset().top });
    contentPadding = 0;

    pageHeight = $doc.height();
    windowHeight = $win.height() / 3;
    footerHeight = 0;

    checkDesktopContent();
    calculateScroll();
    checkActionOverflow();

    if (!eventListeners) addEventListeners();
  }

  var attachIScroll = function() {
    // If there is nothing to scroll, don't worry about this
    if ($('#scroll').length == 0) return;

    // Destroy it first
    if (scroller) {
      scroller.destroy();
      scroller = null;
    }

    setTimeout(function(){
        scroller = new iScroll('scroll', {
          fadeScrollbar: true,
          hideScrollbar: true
        });
    }, 0);
  }

  var addEventListeners = function () {
    eventListeners = true;
    
    galaxy.on('click', function (e) {
      e.preventDefault();
    });

    $toggleSpinner.click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      $navComponents.toggleClass('active');
    });

    $doc.on('click', function () {
      $navComponents.removeClass('active');
    });

    $(window).on('scroll', calculateScroll);
    $(window).on('scroll', attachIScroll);
    // For documentation purposes. Remove this on production
    $(window).on('scroll', checkActionOverflow);
  }

  var checkDesktopContent = function () {
    windowWidth = $(window).width();
    if (windowWidth <= 768) {
      var content = $('.content')
      if (content.length > 1) {
        $(content[0]).remove()
      }
    }
  }

  var calculateScroll = function () {
    // if small screen don't worry about this
    if (windowWidth <= 768) return

    // Save scrollTop value
    var contentSectionItem;
    var currentTop = $win.scrollTop();

    // Injection of components into phone
    for (var l = contentSection.length; l--;) {
      if ((topCache[l] - currentTop) < windowHeight) {
        if (currentActive == l) return;
        currentActive = l;
        $bod.find('.component.active').removeClass('active');
        contentSectionItem = $(contentSection[l])
        contentSectionItem.addClass('active')
        if(contentSectionItem.attr('id')) {
          galaxy.attr("id", contentSectionItem.attr('id') + "InPhone");
        } else {
          galaxy.attr("id", "")
        }
        if (!contentSectionItem.hasClass('informational')) {
          updateContent(contentSectionItem.find('.prettyprint').not('.js').text())
        }
        break
      }
    }
  }

  var updateContent = function (content) {
    $('#galaxy-window').html(content);
  }

  $(window).on('load resize', initialize);
});