  var isSupported = function(nav, doc) {

    nav = nav || navigator;
    doc = doc || document;

    var ua = nav.userAgent;
    var anyVersion = null;

    var browserIsLowerThan = function(browserIdentifier, minVersion) {

      var ident = browserIdentifier + "/";
      var version;

      if (ua.indexOf(ident) > -1) {
        if (minVersion === anyVersion) {
          return true;
        }
        else {
          version = parseInt(ua.split(ident)[1].split(".")[0]);
          return version < minVersion;
        }
      }

      return false;

    };

    // Support isn't reported correctly on Safari, so UA sniffing is used to discount Safari on desktop or iDevices
    // (it's likely to be a while before they support this)
    var isSafari = (browserIsLowerThan("Safari", anyVersion) ||
                    browserIsLowerThan("AppleWebKit", anyVersion)) &&
                   !browserIsLowerThan("Chrome", anyVersion);
    if (isSafari) {
      return false;
    }

    // Discount Chrome 41 and lower. document.execCommand is partially supported in
    // earlier versions, but not for our purposes
    if (browserIsLowerThan("Chrome", 42)) {
      return false;
    }

    // Checking for support in advance triggers a permissions pop up in supported versions of IE
    // We want to avoid this at least until the button is clicked, so bypass this check in IE > 8
    var isIE = ua.indexOf("MSIE ") > -1 || browserIsLowerThan("Trident", anyVersion);
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
