  var cutsTheMustard = function(doc, win) {

    doc = doc || document;
    win = win || window;

    var cuts = true;

    // In IE8 or lower, or similarly old browsers, bail out and return a dummy span to any WebCopy calls
    if (typeof doc.addEventListener === "undefined") {
      win.WebCopy = function() {        
        var noMustardEl = document.createElement("span");
        noMustardEl.setAttribute("class", "webCopy-not-supported");
        noMustardEl.setAttribute("style", "display:none;");
        return noMustardEl;
      };
      win.WebCopy.isSupported = false;
      cuts = false;
    }

    return cuts;

  };
