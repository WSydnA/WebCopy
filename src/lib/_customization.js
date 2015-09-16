  var useCustomContent = function(content, customContent) {

    var propsToCheck = ["ready", "done", "error"];

    for (var p = 0; p < propsToCheck.length; p++) {

      var prop = propsToCheck[p];

      if (customContent[prop] !== null && typeof customContent[prop] === "string" && customContent[prop].length > 0) {
        content[prop] = customContent[prop];
      }
    }

    return content;
  };

  var useCustomClasses = function(classes, customClasses) {

    var propsToCheck = ["ready", "done", "error"];

    for (var p = 0; p < propsToCheck.length; p++) {

      var prop = propsToCheck[p];

      if (customClasses[prop] !== null && typeof customClasses[prop] === "string" && customClasses[prop].length > 0) {
        classes[prop] += " " + customClasses[prop];
      }
    }

    return classes;
  };
