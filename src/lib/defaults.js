  var Defaults = function() {

    this.settings = {
      focusData: false,
      buttonContent: {},
      buttonClasses: {}
    };

    this.buttonContent = {
      ready: "Copy",
      done: "Copied",
      error: "Failed"
    };

    this.buttonClasses = {
      ready: "webCopy",
      done: "webCopy webCopy-done",
      error: "webCopy webCopy-error"
    };

  };
