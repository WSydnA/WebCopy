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
