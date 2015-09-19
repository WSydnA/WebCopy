# WebCopy

[![GitHub version](https://badge.fury.io/gh/AndyWhite87%2FWebCopy.svg)](http://badge.fury.io/gh/AndyWhite87%2FWebCopy)
[![Dependency Status](https://david-dm.org/AndyWhite87/WebCopy.svg)](https://david-dm.org/AndyWhite87/WebCopy)
[![Dependency Status](https://david-dm.org/AndyWhite87/WebCopy/dev-status.svg)](https://david-dm.org/AndyWhite87/WebCopy#info=devDependencies)
[![Build Status](https://travis-ci.org/AndyWhite87/WebCopy.svg?branch=master)](https://travis-ci.org/AndyWhite87/WebCopy)
[![Coverage Status](https://coveralls.io/repos/AndyWhite87/WebCopy/badge.svg?branch=master&service=github)](https://coveralls.io/github/AndyWhite87/WebCopy?branch=master)

WebCopy makes copying to the clipboard easy. Pure JavaScript, no dependencies, no need for Flash.

## Usage
WebCopy adds a constructor (called WebCopy) to the global scope. The constructor takes two arguments: *elementToCopy* (required) and *settings* (optional). Given a valid *elementToCopy*, WebCopy returns an HTML button element, complete with stateful content and event listeners.

#### Valid arguments
#####*elementToCopy*
Must be an HTML `<input>` or `<textarea>`, or an element with a `contentEditable` attribute set to `true`. In addition, the element must exist within the document body, and must be visible (eg, it must not have `display: none` set in its styles).
You can use a CSS selector instead of the actual element. If you're using JQuery, you can use a JQuery object instead (but note that only the first matching element will be used).

#####*settings*
A settings object. All values are optional.
- `focusData` True or false (defaults to false). Set this to true if you want WebCopy to highlight the data that has been copied, after the user clicks the copy button. By default the copied text won't be highlighted - the button will remain focussed insted.
- `buttonContent` An object that can have up to three properties: `ready`, `done` and `error`. Each of these must be strings and will be used for the content inside the button in each of its three states. The defaults are "Copy", "Copied" and "Failed", but you can supply your own text or HTML values.
- `buttonClasses` An object that can have up to three properties: `ready`, `done` and `error`. Each of these must be strings and will be used as CSS classes on the button in each of its three states. Classes should be separated with spaces.

### Basic usage
To generate a new copy button, call WebCopy and pass in a valid HTML element as the elementToCopy:

```js
var elementToCopy = document.querySelector("#example");        // Get the element to copy (eg an input)
var container = elementToCopy1.parentNode;                     // Get the element's container (so we know where to put the button)
var copyButton = new WebCopy(elementToCopy);                   // Call WebCopy to generate a copy button
container.insertBefore(copyButton, elementToCopy.nextSibling); // Insert the copy button directly after the element
```

### Using settings
To use settings, pass in an object as the second argument. THis example uses all available settings.

```js
var copyButton = new WebCopy("#example", {                 // Get the element to copy (we're using a selector this time instead of passing in an element)
  focusData: true,                                         // After the button is clicked, the copied text will be highlighted
  buttonContent: {
    ready: "<span class='icon-clipboard'> Copy me</span>", // Will be parsed as HTML and inserted into the button
    done: "<span class='icon-check'> I'm copied!</span>"   // Will be parsed as HTML and inserted into the button after it has been clicked
  },
  buttonClasses: {
    ready: "button pink bold square",                      // These classes will be added to the button in its unclicked state        
    done: "button green italic square",                    // These classes will be added to the button after it is clicked, if the copy was successful
    error: "button square"                                 // These classes will be added to the button after it is clicked, if the copy was *not* successful
  }
});
var elementToCopy = document.querySelector("#example");    // Get the element to copy
var container = elementToCopy2.parentNode;                 // Get the element's container
container.insertBefore(copyButton2, elementToCopy2);       // Insert the copy button directly before the element
```

### JQuery usage
WebCopy isn't a JQuery plugin and doesn't create any JQuery code, but it understands JQuery objects.

```js
var $elementToCopy = $("#example");                // Get the element to copy
var $copyButton = new $(WebCopy($elementToCopy, {  // Call WebCopy, passing in the element to copy
  buttonClasses: {                                 // Supply any settings you like
    ready: "button",
    done: "button button-success",
    error: "button button-error"
  }
}));
$elementToCopy.after($copyButton);                 // Insert the button into your page
```

## Supported browsers
- Chrome 42+
- Firefox 41+
- Opera 29+
- IE 9+
- Edge

Not currently supported in Safari (including Chrome for iOS) or Opera Mini. The code will still 'work' in these unsupported browsers (ie, it won't cause your scripts to crash) but an invisible span will be returned instead of a copy button. This means you don't need to adapt your code to account for unsupported browsers.
