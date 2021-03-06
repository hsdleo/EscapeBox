Humanize Duration
=================

[![npm version](https://badge.fury.io/js/humanize-duration.svg)](https://npmjs.org/package/humanize-duration)
[![build status](https://travis-ci.org/EvanHahn/HumanizeDuration.js.svg?branch=master)](https://travis-ci.org/EvanHahn/HumanizeDuration.js)

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour". Enter Humanize Duration!

Basic usage
-----------

This package is available as *humanize-duration* in npm and Bower. You can also include the JavaScript in the browser.

In the browser:

```html
<script src="humanize-duration.js"></script>
<script>
humanizeDuration(12000)
</script>
```

In Node (or Browserify or Webpack or anywhere with CommonJS):

```js
var humanizeDuration = require("humanize-duration")
humanizeDuration(12000)
```

Usage
-----

By default, Humanize Duration will humanize down to the second, and will return a decimal for the smallest unit. It will humanize in English by default.

```js
humanizeDuration(3000)      // "3 seconds"
humanizeDuration(2015)      // "2.25 seconds"
humanizeDuration(97320000)  // "1 day, 3 hours, 2 minutes"
```

You can change the settings by passing options as the second argument:

```js
humanizeDuration(3000, { language: "es" })  // "3 segundos"
humanizeDuration(5000, { language: "ko" })  // "5 초"

humanizeDuration(22140000, { delimiter: " and " })  // "6 hours and 9 minutes"
humanizeDuration(22140000, { delimiter: "--" })     // "6 hours--9 minutes"

humanizeDuration(260040000, { spacer: " whole " })  // "3 whole days, 14 whole minutes"
humanizeDuration(260040000, { spacer: "" })         // "3days, 14minutes"

humanizeDuration(3600000, { units: ["hours"] })          // "1 hour"
humanizeDuration(3600000, { units: ["days", "hours"] })  // "1 hour"
humanizeDuration(3600000, { units: ["minutes"] })        // "60 minutes"

humanizeDuration(1200)                   // "1.2 seconds"
humanizeDuration(1200, { round: true })  // "1 second"
humanizeDuration(1600, { round: true })  // "2 seconds"

humanizeDuration(150000)                       // "2.5 minutes"
humanizeDuration(150000, { halfUnit: false })  // "2 minutes, 30 seconds"

humanizeDuration(3600000, {
  language: "es",
  units: ["minutes"]
})
// "60 minutos"
```

### Humanizers

If you find yourself setting same options over and over again, you can create a *humanizer* that changes the defaults, which you can still override later.

```js
var spanishHumanizer = humanizeDuration.humanizer({
  language: "es",
  units: ["years", "months", "days"]
})

spanishHumanizer(71177400000)  // "2 años, 3 meses, 2 días"
spanishHumanizer(71177400000, { units: ["days", "hours"] })  // "823 días, 19.5 horas"
```

You can also add new languages to humanizers. For example:

```js
var shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      year: function() { return "y"; },
      month: function() { return "mo"; },
      week: function() { return "w"; },
      day: function() { return "d"; },
      hour: function() { return "h"; },
      minute: function() { return "m"; },
      second: function() { return "s"; },
      millisecond: function() { return "ms"; },
    }
  }
})

shortEnglishHumanizer(15600000)  // "4 h, 20 m"
```

You can also add languages after initializing:

```js
var humanizer = humanizeDuration.humanizer()

humanizer.languages.shortEn = {
  year: function(c) { return c + "y"; },
  // ...
```

Internally, the main `humanizeDuration` function is just a wrapper around a humanizer.

Supported languages
-------------------

Humanize Duration supports the following languages:

* Arabic (ar)
* Catalan (ca)
* Chinese, simplified (zh-CN)
* Chinese, traditional (zh-TW)
* Danish (da)
* Dutch (nl)
* English (en)
* French (fr)
* German (de)
* Hungarian (hu)
* Italian (it)
* Japanese (ja)
* Korean (ko)
* Norwegian (nob)
* Polish (pl)
* Portuguese (pt)
* Russian (ru)
* Spanish (es)
* Swedish (sv)
* Turkish (tr)

For a list of supported languages, you can use the `getSupportedLanguages` function.

```js
humanizeDuration.getSupportedLanguages()
// ["ar", "ca", "da", "de" ...]
```

Credits
-------

Lovingly made by [Evan Hahn](http://evanhahn.com/) with help from:

* [Martin Prins](https://github.com/magarcia) for language support
* [Filipi Siqueira](https://github.com/filipi777) for Portuguese support
* [Peter Rekdal Sunde](https://github.com/peters) for Norwegian support
* [Michał Janiec](https://github.com/mjjaniec) for Polish support
* [Eileen Li](https://github.com/eileen3) for Chinese support
* [Tommy Brunn](https://github.com/Nevon) for Swedish support
* [Giovanni Pellerano](https://github.com/evilaliv3) for Italian support
* [Rahma Sghaier](https://twitter.com/sghaierrahma) for Arabic support

Licensed under the WTFPL, so you can do whatever you want. Enjoy!
