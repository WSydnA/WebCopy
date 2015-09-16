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
