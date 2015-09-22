  var WebCopy = function(elementToCopy, settings, navigator, document) {
  
    // Return a dummy element if not supported in the current browser
    if (!isSupported(navigator, document)) {
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
