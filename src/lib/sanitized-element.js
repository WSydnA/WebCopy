  var sanitizedElement = function(element) {

    if (typeof element === "undefined" || element === null) {
      return null;
    }

    // If a string has been passed in as the element, treat it as a selector
    else if (typeof element === "string") {
      element = document.querySelector(element);
      return element;
    }

    // If a JQuery-like object has been passed in as the element, break it out
    if (element.length > 0) {
      element = element[0];
      return element;
    }

    // If the element really is an HTML element, return it right back
    else if (element instanceof HTMLElement) {
      return element;
    }
    
    return null;
  };
