describe("cutsTheMustard", function() {

  it("returns true in modern browsers", function() {

    var testEl = document.createElement("div");
    var mockWindow = {};
    var cuts = cutsTheMustard(testEl, mockWindow);

    expect(cuts).toBeTruthy();

  });

  it("returns false in old browsers", function() {

    var testEl = document.createElement("div");
    testEl.addEventListener = undefined;
    var mockWindow = {};
    var cuts = cutsTheMustard(testEl, mockWindow);

    expect(cuts).not.toBeTruthy();
    expect(mockWindow.WebCopy.isSupported).toBe(false);

  });

  it("creates a constructor that returns invisible elements in old browsers", function() {

    var testEl = document.createElement("div");
    testEl.addEventListener = undefined;
    var mockWindow = {};
    var cuts = cutsTheMustard(testEl, mockWindow);

    var testButton = new mockWindow.WebCopy();
    document.body.appendChild(testButton);
    var classes = testButton.classList.toString();
    var styles = window.getComputedStyle(testButton);

    expect(cuts).not.toBeTruthy();
    expect(mockWindow.WebCopy.isSupported).toBe(false);
    expect(classes).toBe("webCopy-not-supported");
    expect(styles.getPropertyValue("display")).toBe("none");

  });

});
