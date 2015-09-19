/*! WebCopy.0.4.0.js | http://andywhite87.github.io/WebCopy/ | MIT
*   Andy White | https://twitter.com/etihWydnA
*   Built on Sat, 19 Sep 2015 13:45:12 GMT */

;(function() {

"use strict";

  var cutsTheMustard = function() {

    var cuts = true;

    // In IE8 or lower, or similarly old browsers, bail out and return a dummy span to any WebCopy calls
    if (typeof window.addEventListener === "undefined") {
      window.WebCopy = function() {        
        var noMustardEl = document.createElement("span");
        noMustardEl.setAttribute("class", "webCopy-not-supported");
        noMustardEl.setAttribute("style", "display:none;");
        return noMustardEl;
      };
      window.WebCopy.isSupported = false;
      cuts = false;
    }

    return cuts;

  };

  if (!cutsTheMustard()) {
    return false;
  }

  var Defaults = function() {

    this.settings = {
      focusData: false,
      buttonContent: {},
      buttonClasses: {}
    };

    this.buttonContent = {
      ready: "Copy",
      done: "Copied",
      error: "Failed"
    };

    this.buttonClasses = {
      ready: "webCopy",
      done: "webCopy webCopy-done",
      error: "webCopy webCopy-error"
    };

  };

  var ClassModifier = function() {

    this.add = function(element, classes) {

      element = modifyClassList(element, classes, modificationTypes.add);
      return element;

    };

    this.remove = function(element, classes) {

      element = modifyClassList(element, classes, modificationTypes.remove);
      return element;

    };

    var modificationTypes = {
      add: "add",
      remove: "remove"
    };

    var modifyClassList = function(element, classes, modificationType) {

      var classArray = classes.split(" ");

      for (var c = 0; c < classArray.length; c++) {

        var cls = classArray[c];

        if (modificationType === modificationTypes.add) {
          element.className += " " + cls;
        }
        else if (modificationType === modificationTypes.remove) {
          element.className = element.className.split(cls).join("");
        }

      }

      element.className = element.className.trim().replace(/\s\s+/g, " ");
      return element;

    };

  };

  var PropertyModifier = function() {

    this.content = function(content, customContent) {

      var propsToModify = ["ready", "done", "error"];
      content = modifyProperties(content, customContent, propsToModify, modificationTypes.replace);

      return content;
    };

    this.classes = function(classes, customClasses) {

      var propsToModify = ["ready", "done", "error"];
      classes = modifyProperties(classes, customClasses, propsToModify, modificationTypes.add);

      return classes;      
    };

    var modificationTypes = {
      add: "add",
      replace: "replace"
    };

    var modifyProperties = function(base, additional, propsToModify, modType) {

      if (typeof propsToModify !== "object" || propsToModify.length < 0) {
        return base;
      }

      var modified = base;

      for (var p = 0; p < propsToModify.length; p++) {

        var prop = propsToModify[p];

        if (additional[prop] !== null && typeof additional[prop] === "string" && additional[prop].length > 0) {

          if (modType === modificationTypes.add) {
            modified[prop] += " " + additional[prop];
          }

          else if (modType === modificationTypes.replace) {
            modified[prop] = additional[prop];
          }

        }
      }

      return modified;
    }; 

  };

  var elementIsValid = function(element) {

    if (typeof element === "undefined" || element === null) {
      return false;
    }

    var elementIsInBody = (element === document.body) ? false : document.body.contains(element);

    var tagName = element.tagName.toUpperCase();
    var contentEditable = element.getAttribute("contentEditable");
    var elementIsAllowed = (tagName === "INPUT" || tagName === "TEXTAREA" || contentEditable) ? true : false;

    return (elementIsInBody && elementIsAllowed) ? true : false;
  };

  var getContentString = function(content) {

    var ready = "<span class='webCopy-ready-content'>" + content.ready + "</span>";
    var done = "<span class='webCopy-done-content'>" + content.done + "</span>";
    var error = "<span class='webCopy-error-content'>" + content.error + "</span>";

    return ready + done + error;
  };

  var insertStyles = function(isSupported) {

    var styles;
    
    if (isSupported) {
      styles = ".webCopy .webCopy-done-content,.webCopy .webCopy-error-content {display:none;}" +
      ".webCopy.webCopy-done .webCopy-ready-content,.webCopy.webCopy-error .webCopy-ready-content {display:none;}" +
      ".webCopy.webCopy-done .webCopy-done-content {display: inline;}" +
      ".webCopy.webCopy-error .webCopy-error-content {display: inline;}" +
      ".webCopy-element-invalid {display: none;}";
    }
    else {
      styles = ".webCopy-not-supported {display: none;}";
    }

    var styleTag = document.createElement("style");
    styleTag.setAttribute("class", "webCopy-styles");
    styleTag.appendChild(document.createTextNode(styles));
    document.querySelector("head").appendChild(styleTag);
  };

  var isSupported = function() {

    // Support isn't reported correctly on Safari, so UA sniffing is used to discount Safari on desktop or iDevices
    // (it's likely to be a while before they support this)
    var isSafari = (navigator.userAgent.indexOf("Safari") > -1 || navigator.userAgent.indexOf("AppleWebKit") > -1) &&
        navigator.userAgent.indexOf("Chrome") < 0;
    if (isSafari) {
      return false;
    }

    // Checking for support in advance triggers a permissions pop up in supported versions of IE
    // We want to avoid this at least until the button is clicked, so bypass this check in IE > 8
    var isIE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1;
    if (isIE) {
      return true;
    }

    // Other supported browsers return a boolean in response to the following query
    if (typeof document.execCommand("copy") === "boolean") {
      return true;
    }

    // If we've got this far, this browser is not supported
    return false;
  };

  var sanitizedElement = function(element) {

    // If a string has been passed in as the element, treat it as a selector
    if (typeof element === "string") {
      element = document.querySelector(element);
    }

    // If a JQuery object has been passed in as the element, break it out
    if (typeof jQuery !== "undefined" && element instanceof jQuery) {
      element = element[0];
    }
    
    return element;
  };

  /**
  * @constructor - Returns a new "Copy to clipboard" button for insertion into the DOM.
  *
  * @param {element} elementToCopy - the element to copy data content from when the button is clicked.
  * @param {object} [settings] - optional settings. Supported properties are:
  * @param {boolean} [settings.focusData] - whether to highlight data after it has been copied. Defaults to false.
  * @param {object} [settings.buttonContent] - content to use for the button in its ready, done and error states.
  * @param {object} [settings.buttonClasses] - CSS classes to be applied to the button in its ready, done and error states.
  *
  * @returns {element} the copy button, along with event handlers, for insertion into the DOM.
  */ 
  var WebCopy = function(elementToCopy, settings) {
  
    // Return a dummy element if not supported in the current browser
    if (!isSupported()) {
      var notSupportedEl = document.createElement("span");
      notSupportedEl.setAttribute("class", "webCopy-not-supported");
      return notSupportedEl;
    }

    // Ensure the supplied element is a usable HTML element
    elementToCopy = sanitizedElement(elementToCopy);

    // Return null if elementToCopy is not in the document body or is of the wrong type
    if (!elementIsValid(elementToCopy)) {
      var notValidEl = document.createElement("span");
      notValidEl.setAttribute("class", "webCopy-element-invalid");
      return notValidEl;
    }

    var defaults = new Defaults();

    var modifyProperties = new PropertyModifier();

    var modifyClasses = new ClassModifier();

    // Set settings to default values if no/invalid settings object has been supplied
    if (typeof settings === "undefined" || settings === null || settings === {} || typeof settings.length !== "undefined")     {
      settings = defaults.settings;
    }

    // Create an object representing stateful button content. Use any supplied custom content instead of the default
    var buttonContent = defaults.buttonContent;
    if (typeof settings.buttonContent !== "undefined" && settings.buttonContent !== null) {
      buttonContent = modifyProperties.content(buttonContent, settings.buttonContent);
    }

    // Create an object representing stateful button classes. Add any supplied custom classes to the defaults
    var buttonClasses = defaults.buttonClasses;
    if (typeof settings.buttonClasses !== "undefined" && settings.buttonClasses !== null) {
      buttonClasses = modifyProperties.classes(buttonClasses, settings.buttonClasses);
    }

    // Convert the buttonContent object into an HTML string for insertion into the button
    var buttonHtml = getContentString(buttonContent);

    // Create the button
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button = modifyClasses.add(button, buttonClasses.ready);
    button.innerHTML = buttonHtml;

    // Attach a click handler to the button to copy the text and mark as copied
    button.addEventListener("click", function() {
      var selection;
      elementToCopy.focus();

      if (elementToCopy.getAttribute("contentEditable")) {
        var range = document.createRange();
        range.selectNodeContents(elementToCopy);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      else {
        elementToCopy.setSelectionRange(0, 9999);
      }

      // Copy selected data to the clipboard
      var success = document.execCommand("copy");

      // Set the button's classes appropriately (based on whether the copy worked)
      var classesToAdd = success ? buttonClasses.done : buttonClasses.error;
      button = modifyClasses.remove(button, buttonClasses.ready);
      button = modifyClasses.add(button, classesToAdd);

      // If the focusData setting is off, deselect the data and focus the button after copying
      if (!settings.focusData) {
        if (selection) {
          selection.removeAllRanges();
        }
        else {
          elementToCopy.setSelectionRange(0, 0);
        }
        button.focus();
      }
    });

    // Attach a change listener to the elementToCopy to reset the button content if copied content changes
    elementToCopy.addEventListener("input", function() {
      button = modifyClasses.remove(button, buttonClasses.done);
      button = modifyClasses.remove(button, buttonClasses.error);
      button = modifyClasses.add(button, buttonClasses.ready);
    });

    // Return the completed button, event listeners and all
    return button;
  };

  // Insert WebCopy styles at the end of the document head.
  // Full styles if WebCopy is supported in this browser, else styles to hide the dummy span
  insertStyles(isSupported());
  
  // Attach a boolean to WebCopy to indicatewhether it is supported in this browser 
  WebCopy.isSupported = isSupported();

  // Attach the WebCopy constructor to the window object to allow it to be called
  window.WebCopy = WebCopy;

})();
