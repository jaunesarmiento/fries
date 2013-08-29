Fries v1.0.1
===

Fries lets you prototype Android apps using just HTML, CSS, and Javascript and
was inspired by [Ratchet]. We all know that you can find loads of iOS
development tools out there, so this time let's give some love to Android.


## What's new in version 1.0.1

__Dependency__

Fries is now dependent on [Grunt] for task automation. Tasks like concatenating
CSS or JavaScript files and minifying them take some time thus the framework
required some kind of automation of these kinds of tasks.

To install Grunt:

```bash
$ npm install -g grunt
```

Then run it inside Fries' directory:

```bash
$ cd fries/
$ grunt
```

__SASS/SCSS Support__

Fries now uses SASS as its CSS preprocessor. Check out `/lib/sass/` for the
SASS files. You can now easily theme Fries using SASS and compile them into
CSS files by running `grunt sass`.


__Massive Style Update__

Most of the components got a major overhaul since `v1.0.0` to make Fries look
more like the native Android UI. Some of these changes may break your prototype
when you update from `v1.0.0` to `v1.0.1` so please read the list of
breaking changes section to see which components are affected.

__New Components__

Here's the list of new components that are added to Fries:
* Checkboxes
* Radio buttons
* On/Off switches
* Dialogs
* Toast notificatons
* Automatic resizing of the action bar


## Breaking changes

Here are some breaking changes that you might want to take a look at before upgrading to `v1.0.1`.

__Up Button__

Since `v1.0.1`, Fries no longer uses the CSS up/back chevron for its Up Button. Please
use the following markup to use the up button in your inner pages:

    <a href="index.html" class="app-icon action up" data-transition="pop">
      <i class="icon-up-button"></i>
      <i class="icon-fries"></i><!-- Or replace this with your app icon -->
    </a>

Consider the following:

* Fries now uses `<i class="icon-up-button></i>` instead of the previous `<i class="chevron"></i>`.
* The `data-transition="pop"` attribute tells `stack.js` to pop the browser history thus performing a
`popstate` event. `data-transition="push"` still works the same.


## Running the examples

To run the examples, make sure you already have [Grunt] installed. Grunt will
generate the JavaScript/CSS files that are needed by the examples to run.

```bash
$ cd fries # cd to fries' directory
$ grunt
```

And then start a server to host the files
```bash
$ python -m SimpleHTTPServer
```

Then just fire up your browser and go to `http://localhost:3000/`

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
