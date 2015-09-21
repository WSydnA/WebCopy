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

      if (typeof propsToModify === "object" && propsToModify.length > 0) {

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
      }
    }; 

  };
