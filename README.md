# Fries

Fries is an awesome mobile development framework (yes, not just for prototyping!) 
for Android apps using just HTML, CSS, and Javascript and was inspired by [Ratchet].
We all know that you can find loads of iOS development tools out there, 
so this time let's give some love to Android.


__What's New In Version 1.0.0__

The initial push of Fries was generally made to see how the community would react
to something like this. And I've seen great feedback so I think Fries needed a
major overhaul. A lot of things were missing in the previous version and
version 1.0.0 is a huge step from that.

Here's a list of new things in version 1.0.0:

* Fries is now optimized for PhoneGap.
* Added Android-like page transitions using `stack.js` (based on Ratchet's push.js).
Since push.js is optimized for iOS-like transitions, I found it unsuitable to be
used in Fries. `stack.js` mimics the page transitions in Android using CSS3 transforms
and oh, did I mention it works smoothly?
* Your pages should now be wrapped in `.page` class for `stack.js` to work.
* Added bottom-positioned action bars and evenly spaced out action buttons using flex-box layout mode.
* Not using input[type=*] selectors to style input elements anymore. Input elements 
are now styled using classes (.input-text, etc). This was done so that the form elements
can still be styled easily using custom CSS.
* Reworked tabs. Added tab content transition and active tab highlighting. Added `tabs.js`.
* Removed iScroll dependency, sadly. iScroll works like the native iOS so again, 
I found it unsuitable for Fries. You can still use it if you want to though.
* Reworked `action-bars.js` and `spinner.js` as the previous versions attach multiple
event handlers causing unexpected results.

See the [changelog] to see the changes in detail.


## Getting Started

Fries is now optimized to run as a PhoneGap app. I found it hard to optimize on the mobile
browser because of a few reasons:

* There's no way to remove the browser's navigation bar except by adding a few pixels
of padding on the bottom of the page. (Correct me if I'm wrong)
* Adobe Edge Inspect (which I use for testing) renders differently from the mobile
browser.
* It appears that there's an issue with the mobile browser's line-height property.
If you check out the examples on your Android device's mobile browser, the text are
slightly off-center vertically.

Now with all that said, head on over to the [tutorial] on how to setup your first
Fries app.


## Development Roadmap

Fries aims to make Android apps fast and easy using just HTML, CSS and JavaScript. 
In the long run, these are the following features and components that I think 
should be added to Fries:

* Scrollable Tabs
* Modals
* Other Form Elements
* Shelf Menus (a la Facebook or Path style menu)
* Loading Indicator
* Custom Scroller (iScroll is great but Fries aims to be as close to an Android app as possible)
* Typography
* Theming using LESS or SASS
* Automatic resizing of the action bars and tabs on landscape view. In a typical
Android app, the action bars and tabs resizes to 40px from the default 48px.


## Special Thanks

I'd like to thank [Dave Gamache], [Connor Sears], and [Jacob Thornton] for a wonderful job on [Ratchet].


## License

__The MIT License (MIT)__ Copyright (c) 2013 Jaune Sarmiento

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[Ratchet]: http://maker.github.io/ratchet
[Jaune Sarmiento]: http://jaunesarmiento.me
[docs]: http://jaunesarmiento.me/fries
[Dave Gamache]: http://github.com/dhgamache
[Connor Sears]: http://github.com/connors
[Jacob Thornton]: http://github.com/fat
[Matteo Spinelli]: http://cubiq.org/
[changelog]: https://github.com/jaunesarmiento/fries/blob/wip-1.0.0/changelog.txt

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5442e4f5cc5951efb12361a41734c6d5 "githalytics.com")](http://githalytics.com/jaunesarmiento/fries)