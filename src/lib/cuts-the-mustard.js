  var cutsTheMustard = function(testEl) {

    var cuts = true;

    // In IE8 or lower, or similarly old browsers, bail out and return a dummy span to any WebCopy calls
    if (typeof testEl.addEventListener === "undefined") {
      window.WebCopy = function() {        
        var noMustardEl = document.createElement("span");
        noMustardEl.setAttribute("class", "webCopy-not-supported");
        noMustardEl.setAttribute("style", "display:none;");
        return noMustardEl;
      };
      window.WebCopy.isSupported = false;
      cuts = false;
    }

    return cuts;

  };
