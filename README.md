Fries [![Stories in Ready](http://badge.waffle.io/jaunesarmiento/fries.png)](http://waffle.io/jaunesarmiento/fries)
===

Fries is an awesome mobile development framework (yes, not just for prototyping!) 
for Android apps using just HTML, CSS, and Javascript and was inspired by [Ratchet].
We all know that you can find loads of iOS development tools out there, 
so this time let's give some love to Android.


## Version 1.0.1

In the next few weeks I'm planning to release version `1.0.1` of Fries and here's the list
of things that I want to be included in it:

* SASS/SCSS support for easier theming
* Theme customization examples
* Automation of tasks using [Grunt]
* Form Switches (checkboxes, radio, and on/off switches)
* Textarea styling
* Toast Notifications
* Automatic resizing of the action bars to 40px on landscape orientation
* Replace the CSS up/back chevron on the action bar with official Android up/back icon
* A better documentation of each component

Check out the [changelog] before doing any of these. As they might already been implemented on
the current development branch.


## Breaking changes

Here are some breaking changes that you might want to take a look at before upgrading to version `1.0.1`.

__Up Button__

Since version `1.0.1`, Fries no longer uses the CSS up/back chevron for its Up Button. Please
use the following markup to use the up button in your inner pages:

    <a href="index.html" class="app-icon action up" data-transition="pop">
      <i class="icon-up-button"></i>
      <i class="icon-fries"></i><!-- Or replace this with your app icon -->
    </a>

Consider the following:

* The `href` attribute is now just a fallback for when `stack.js` fails to load so that your app
won't break when pressing the up button.
* Fries now uses `<i class="icon-up-button></i>` instead of the previous `<i class="chevron"></i>`.
* The `data-transition="pop"` attribute tells `stack.js` to pop the browser history thus performing a
`popstate` event. `data-transition="push"` still works the same.


__Font icons__

The `lib/fonts/` directory where the Android font icons are is moved to `dist/fonts/`. You might want
to update `icomoon.css` so it points to the correct directory unless you're starting from scratch.


## Contributing to Fries

If you plan on contributing to Fries. Kindly read the [contributing guide] first before doing anything.
Also, please work on the `wip-1.0.1` branch and do your pull requests there as I'm not accepting any
pull requests to version `1.0.0` anymore.


[Ratchet]: http://maker.github.io/ratchet
[Jaune Sarmiento]: http://jaunesarmiento.me
[demo project]: https://github.com/jaunesarmiento/HelloFries
[changelog]: https://github.com/jaunesarmiento/fries/blob/wip-1.0.1/changelog.txt
[Grunt]: http://gruntjs.com/
[Contributing guide]: https://github.com/jaunesarmiento/fries/wiki/Contributing-to-Fries

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5442e4f5cc5951efb12361a41734c6d5 "githalytics.com")](http://githalytics.com/jaunesarmiento/fries)
