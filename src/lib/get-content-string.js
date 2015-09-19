  var getContentString = function(content) {

    var errorPlaceholder = "{WebCopy error}";

    if (typeof content === "undefined" || typeof content !== "object" || content === null) {
      content = {
        ready: errorPlaceholder,
        done: errorPlaceholder,
        error: errorPlaceholder
      };
    }

    else {
      var propsToCheck = ["ready", "done", "error"];

      for (var p = 0; p < propsToCheck.length; p++) {

        var prop = propsToCheck[p];
        
        if (typeof content[prop] === "undefined" || content[prop] === null) {
          content[prop] = errorPlaceholder;
        } 
      }
    } 

    var ready = "<span class='webCopy-ready-content'>" + content.ready + "</span>";
    var done = "<span class='webCopy-done-content'>" + content.done + "</span>";
    var error = "<span class='webCopy-error-content'>" + content.error + "</span>";

    return ready + done + error;
  };
