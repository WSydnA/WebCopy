  var addClasses = function(element, classes) {

    var classArray = classes.split(" ");
    for (var c = 0; c < classArray.length; c++) {
      element.className += " " + classArray[c];
    }

    element.className = element.className.replace(/^\s+|\s+$/g, "").replace(/\s\s+/g, " ");
    return element;
  };

  var removeClasses = function(element, classes) {

    var classArray = classes.split(" ");
    for (var c = 0; c < classArray.length; c++) {
      element.className = element.className.split(classArray[c]).join("");
    }

    element.className = element.className.replace(/^\s+|\s+$/g, "").replace(/\s\s+/g, " ");
    return element;
  };
