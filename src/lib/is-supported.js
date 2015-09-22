  var isSupported = function(nav, doc) {

    nav = nav || navigator;
    doc = doc || document;

    // Support isn't reported correctly on Safari, so UA sniffing is used to discount Safari on desktop or iDevices
    // (it's likely to be a while before they support this)
    var isSafari = (nav.userAgent.indexOf("Safari") > -1 || nav.userAgent.indexOf("AppleWebKit") > -1) &&
        nav.userAgent.indexOf("Chrome") < 0;
    if (isSafari) {
      return false;
    }

    // Checking for support in advance triggers a permissions pop up in supported versions of IE
    // We want to avoid this at least until the button is clicked, so bypass this check in IE > 8
    var isIE = nav.userAgent.indexOf("MSIE ") > -1 || nav.userAgent.indexOf("Trident/") > -1;
    if (isIE) {
      return true;
    }

    // Other supported browsers return a boolean in response to the following query
    try {
      if (typeof doc.execCommand("copy") === "boolean") {
        return true;
      }
    }
    catch (error) {
      return false;
    }

    // If we've got this far, this browser is not supported
    return false;
  };
