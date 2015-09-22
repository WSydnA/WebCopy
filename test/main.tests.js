describe("main", function() {

  var mockNavigator = { userAgent: "" };

  var clickElement = function(element) {    
    var clickEvent = document.createEvent("CustomEvent");
    clickEvent.initCustomEvent("click", false, false, null);
    element.dispatchEvent(clickEvent);
  };

  it("returns a hidden span if no element is provided", function() {

    var emptySpan = new WebCopy(null, null);
    document.body.appendChild(emptySpan);

    var tagName = emptySpan.tagName.toUpperCase();
    var styles = window.getComputedStyle(emptySpan);

    expect(tagName).toBe("SPAN");
    expect(styles.getPropertyValue("display")).toEqual("none");

  });

  it("returns a displayed button if a valid element is provided", function() {

    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);

    var testBtn = new WebCopy(textArea, null, mockNavigator);
    document.body.appendChild(testBtn);

    var tagName = testBtn.tagName.toUpperCase();
    var styles = window.getComputedStyle(testBtn);

    expect(tagName).toBe("BUTTON");
    expect(styles.getPropertyValue("display")).toEqual("inline-block");

  });

  it("uses default settings if none are provided", function() {

    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);

    var testBtn = new WebCopy(textArea, null, mockNavigator);
    document.body.appendChild(testBtn);

    var readySpan = testBtn.querySelector(".webCopy-ready-content");
    var errorSpan = testBtn.querySelector(".webCopy-error-content");

    expect(readySpan.innerHTML).toEqual("Copy");
    expect(errorSpan.innerHTML).toEqual("Failed");

    expect(testBtn.className).toEqual("webCopy");

    clickElement(testBtn);

    expect(testBtn.classList.toString()).toEqual("webCopy webCopy-error");

  });

  it("adds classes as expected", function() {

    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);

    var settings = {
      buttonClasses: {
        ready: "ready bold",
        error: "error italic"
      }
    };

    var testBtn = new WebCopy(textArea, settings, mockNavigator);
    document.body.appendChild(testBtn);

    expect(testBtn.className).toEqual("webCopy ready bold");
    
    clickElement(testBtn);

    expect(testBtn.classList.toString()).toEqual("webCopy webCopy-error error italic");

  });

  it("adds content as expected", function() {

    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);

    var settings = {
      buttonContent: {
        ready: "This button is ready",
        error: "That didn't work"
      }
    };

    var testBtn = new WebCopy(textArea, settings, mockNavigator);
    document.body.appendChild(testBtn);

    var readySpan = testBtn.querySelector(".webCopy-ready-content");
    var errorSpan = testBtn.querySelector(".webCopy-error-content");

    expect(readySpan.innerHTML).toEqual("This button is ready");
    expect(errorSpan.innerHTML).toEqual("That didn't work");

  });

});
