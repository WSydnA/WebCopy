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
