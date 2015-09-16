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