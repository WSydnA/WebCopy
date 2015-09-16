  var getContentString = function(content) {

    var ready = "<span class='webCopy-ready-content'>" + content.ready + "</span>";
    var done = "<span class='webCopy-done-content'>" + content.done + "</span>";
    var error = "<span class='webCopy-error-content'>" + content.error + "</span>";

    return ready + done + error;
  };
