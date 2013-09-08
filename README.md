# Fries v2.0.0

Fries is an awesome mobile UI framework for Android apps using just HTML, CSS,
and Javascript and is inspired by [Ratchet].


## What's new in v2.0.0

This version (`v2.0.0`) includes the following:

* Toast notifications
* Dialogs
* Checkboxes
* Radio buttons
* On/off toggle switches
* Theming using SASS
* Visual aesthetic improvements
* Task automation using [Grunt]
* and a whole lot of [bug fixes] and a few [breaking changes]

__Wait, why `v2.0.0`?__

I know that I was supposed to release `v1.0.1` but I realized that it doesn't follow
the widely known [Semantic Versioning] so I decided to release this version as `v2.0.0`
instead and from now on will follow the SemVer.


## Getting Started

* [Download] Fries or clone the repository `git clone git@github.com:jaunesarmiento/fries.git`.
* Head on over to the [documentation] to learn more about Fries' components and how to build your first prototype.
* Check out the [examples] to learn how to piece together each component.

### Using Bower

I'm glad to announce that Fries is also now available as a [Bower] package. To
install Fries using Bower, just run:

```shell
$ bower install fries
```


## Running the examples

To run the examples you need to have [Grunt] installed. To install Grunt open up
your shell and do:

```shell
$ npm install -g grunt
```

Then `cd` to Fries' root directory and install all dependencies by running:

```shell
$ npm install
```

After installing the dependencies, fire up a web server by running:

```shell
$ grunt server
```

Then you can open your browser and go to `localhost:8000/examples` to view the
examples.

Or if you have Python installed on your system. Just run the following inside
Fries' root directory:

```shell
$ python -m SimpleHTTPServer
```

Then go to `localhost:8000/examples`.

__Note:__ You also might want to resize your browser's screen resolutiion and
emulate touch events for a better experience. To do these:

1. Open Chrome Developer Tools.
2. Go to settings by clicking the little gear icon at the bottom right of the
   window.
3. Go to Overrides tab.
4. Check the "Device metrics" and enter your desired screen resolution. 380x640
   works like a charm.
5. Then check "Emulate touch events" and that's it.


## Contributing to Fries

If you plan to contributing to Fries. Kindly read the [contributing guide] first before doing anything.


## Special Thanks

I'd like to thank [Dave Gamache], [Connor Sears], and [Jacob Thornton] for a wonderful job on [Ratchet].
The conversion of the official Android icons was done in [IcoMoon]. Also, thanks to [@aymanfarhat](https://github.com/aymanfarhat),
[@jadjoubran](https://github.com/jadjoubran), and [@Wolfr](https://github.com/Wolfr) who kept the issue discussion flowing.


## License

Fries is licensed under the [MIT License]. Copyright &copy; Jaune Sarmiento (http://jaunesarmiento.me) 2013.


## Attribution
**Official Android Icons**

Portions of this page are modifications based on work created and [shared by the Android Open Source Project](http://code.google.com/policies.html) and used according to terms described in the [Creative Commons 2.5 Attribution License](http://creativecommons.org/licenses/by/2.5/).

__Android Action Bar Icon Pack__

By [Tobias Bieniek](https://github.com/Turbo87/Android-Action-Bar-Icon-Pack-Font) also under Creative Commons 2.5 License

[Download]: https://github.com/jaunesarmiento/fries/archive/master.zip
[Ratchet]: http://maker.github.io/ratchet
[documentation]: http://jaunesarmiento.me/fries
[Semantic Versioning]: http://semver.org/
[Grunt]: http://gruntjs.com/
[Bower]: http://bower.io/
[examples]: https://github.com/jaunesarmiento/fries/tree/master/examples
[bug fixes]: https://github.com/jaunesarmiento/fries/issues?labels=&page=1&state=closed
[breaking changes]: https://github.com/jaunesarmiento/fries/wiki/Breaking-Changes
[Dave Gamache]: http://github.com/dhgamache
[Connor Sears]: http://github.com/connors
[Jacob Thornton]: http://github.com/fat
[IcoMoon]: http://icomoon.io
[MIT License]: http://opensource.org/licenses/MIT
[contributing guide]: https://github.com/jaunesarmiento/fries/wiki/Contributing-to-Fries