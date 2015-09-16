  var insertStyles = function(isSupported) {

    var styles;
    
    if (isSupported) {
      styles = ".webCopy .webCopy-done-content,.webCopy .webCopy-error-content {display:none;}" +
      ".webCopy.webCopy-done .webCopy-ready-content,.webCopy.webCopy-error .webCopy-ready-content {display:none;}" +
      ".webCopy.webCopy-done .webCopy-done-content {display: inline;}" +
      ".webCopy.webCopy-error .webCopy-error-content {display: inline;}" +
      ".webCopy-element-invalid {display: none;}";
    }
    else {
      styles = ".webCopy-not-supported {display: none;}";
    }

    var styleTag = document.createElement("style");
    styleTag.setAttribute("class", "webCopy-styles");
    styleTag.appendChild(document.createTextNode(styles));
    document.querySelector("head").appendChild(styleTag);
  };
