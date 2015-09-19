describe("PropertyModifier", function() {

  var defaults = new Defaults();
  var modifyProperties = new PropertyModifier();

  describe(".content", function() {

    it("replaces content correctly", function() {

      var readyContent = "Test content ready";
      var doneContent = "<span class='bold'>Test content done</span>";
      var errorContent = "<div class='error'>Test content error</div>";
      
      var testContent = defaults.buttonContent;

      expect(testContent).toEqual({
        ready: "Copy",
        done: "Copied",
        error: "Failed"
      });

      modifyProperties.content(testContent, { done: doneContent });
      expect(testContent).toEqual({
        ready: "Copy",
        done: doneContent,
        error: "Failed"
      });

      modifyProperties.content(testContent, { ready: readyContent, error: errorContent });
      expect(testContent).toEqual({
        ready: readyContent,
        done: doneContent,
        error: errorContent
      });

    });

  });

  describe(".classes", function() {

    it("adds classes correctly", function() {

      var readyClasses = "btn";
      var doneClasses = "btn btn-green";
      var errorClasses = "btn btn-red btn-disabled";
      
      var testClasses = defaults.buttonClasses;

      expect(testClasses).toEqual({
        ready: "webCopy",
        done: "webCopy webCopy-done",
        error: "webCopy webCopy-error"
      });

      modifyProperties.classes(testClasses, { done: doneClasses });
      expect(testClasses).toEqual({
        ready: "webCopy",
        done: "webCopy webCopy-done " + doneClasses,
        error: "webCopy webCopy-error"
      });

      modifyProperties.classes(testClasses, { ready: readyClasses, error: errorClasses });
      expect(testClasses).toEqual({
        ready: "webCopy " + readyClasses,
        done: "webCopy webCopy-done " + doneClasses,
        error: "webCopy webCopy-error " + errorClasses
      });

    });

  });

});
