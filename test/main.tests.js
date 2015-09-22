describe("main", function() {

  var mockNavigator = { userAgent: "" };

  var clickElement = function(element) {    
    var clickEvent = document.createEvent("CustomEvent");
    clickEvent.initCustomEvent("click", false, false, null);
    element.dispatchEvent(clickEvent);
  };

  var inputOnElement = function(element) {    
    var inputEvent = document.createEvent("CustomEvent");
    inputEvent.initCustomEvent("input", false, false, null);
    element.dispatchEvent(inputEvent);
  };

  it("works with inputs", function() {

    var input = document.createElement("input");
    input.value = "testContent";
    document.body.appendChild(input);

    var testBtn = new WebCopy(input, null, mockNavigator);

    expect(testBtn.tagName).toBe("BUTTON");
    expect(testBtn.className).toEqual("webCopy");

    clickElement(testBtn);
    expect(testBtn.className).toEqual("webCopy webCopy-error");

  });

  it("works with textareas", function() {

    var textArea = document.createElement("textarea");
    textArea.value = "testContent";
    document.body.appendChild(textArea);

    var testBtn = new WebCopy(textArea, null, mockNavigator);

    expect(testBtn.tagName).toBe("BUTTON");
    expect(testBtn.className).toEqual("webCopy");

    clickElement(testBtn);
    expect(testBtn.className).toEqual("webCopy webCopy-error");
    
  });

  it("works with contentEditable elements", function() {

    var contentEditable = document.createElement("div");
    contentEditable.setAttribute("contentEditable", true);
    contentEditable.textContent = "testContent";
    document.body.appendChild(contentEditable);

    var testBtn = new WebCopy(contentEditable, null, mockNavigator);

    expect(testBtn.tagName).toBe("BUTTON");
    expect(testBtn.className).toEqual("webCopy");

    clickElement(testBtn);
    expect(testBtn.className).toEqual("webCopy webCopy-error");
    
  });

  it("does not work with other elements", function() {

    var div = document.createElement("div");
    var p = document.createElement("p");
    var span = document.createElement("span");

    document.body.appendChild(div);
    document.body.appendChild(p);
    document.body.appendChild(span);

    var testBtn1 = new WebCopy(div, null, mockNavigator);
    var testBtn2 = new WebCopy(p, null, mockNavigator);
    var testBtn3 = new WebCopy(span, null, mockNavigator);

    expect(testBtn1.tagName).toBe("SPAN");
    expect(testBtn2.tagName).toBe("SPAN");
    expect(testBtn3.tagName).toBe("SPAN");
    expect(testBtn1.className).toEqual("webCopy-element-invalid");
    expect(testBtn3.className).toEqual("webCopy-element-invalid");
    expect(testBtn3.className).toEqual("webCopy-element-invalid");

    clickElement(testBtn1);
    clickElement(testBtn2);
    clickElement(testBtn3);
    expect(testBtn1.className).toEqual("webCopy-element-invalid");
    expect(testBtn3.className).toEqual("webCopy-element-invalid");
    expect(testBtn3.className).toEqual("webCopy-element-invalid");
    
  });

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

    expect(testBtn.className).toEqual("webCopy webCopy-error");

  });

  it("adds classes as expected", function() {

    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);

    var settings = {
      buttonClasses: {
        ready: "ready readyButton",
        error: "error errorButton"
      }
    };

    var testBtn = new WebCopy(textArea, settings, mockNavigator);
    document.body.appendChild(testBtn);

    expect(testBtn.className).toEqual("webCopy ready readyButton");
    
    clickElement(testBtn);

    expect(testBtn.className).toEqual("webCopy webCopy-error error errorButton");

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

  it("resets the button class when the copied element's content changes", function() {

    var textArea = document.createElement("textarea");
    textArea.value = "testContent";
    document.body.appendChild(textArea);

    var testBtn = new WebCopy(textArea, null, mockNavigator);
    document.body.appendChild(testBtn);

    expect(testBtn.className).toEqual("webCopy");

    clickElement(testBtn);
    expect(testBtn.className).toEqual("webCopy webCopy-error");

    inputOnElement(textArea);
    expect(testBtn.className).toEqual("webCopy");

  });

});
