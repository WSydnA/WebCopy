  var sanitizedElement = function(element) {

    if (typeof element === "undefined" || element === null) {
      return null;
    }

    // If a string has been passed in as the element, treat it as a selector
    if (typeof element === "string") {
      element = document.querySelector(element);
    }

    // If a node list of jQuery-like object has been passed in as the element,
    // break it out and use the first element
    if (element.length > 0) {
      element = element[0];
    }

    // If the element really is an HTML element, return it
    if (element instanceof HTMLElement) {
      return element;
    }
    
    return null;
  };
