  // In IE8 or lower, or similarly old browsers, bail out and return a dummy span to any WebCopy calls
  if (typeof window.addEventListener === "undefined") {
    window.WebCopy = function() {        
      var noMustardEl = document.createElement("span");
      noMustardEl.setAttribute("class", "webCopy-not-supported");
      noMustardEl.setAttribute("style", "display:none;");
      return noMustardEl;
    };
    window.WebCopy.isSupported = false;
    return false;
  }
