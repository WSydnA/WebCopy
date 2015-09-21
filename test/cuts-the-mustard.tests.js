describe("cutsTheMustard", function() {

  it("returns true in modern browsers", function() {

    var testEl = document.createElement("div");
    var cuts = cutsTheMustard(testEl);

    expect(cuts).toBeTruthy();

  });

  it("returns false in old browsers", function() {

    var testEl = document.createElement("div");
    testEl.addEventListener = undefined;
    var cuts = cutsTheMustard(testEl);

    expect(cuts).not.toBeTruthy();
    expect(WebCopy.isSupported).toBe(false);

  });

  it("creates a constructor that returns invisible elements in old browsers", function() {

    var testEl = document.createElement("div");
    testEl.addEventListener = undefined;
    var cuts = cutsTheMustard(testEl);

    var testButton = new WebCopy();
    var classes = testButton.classList.toString();
    var displayStyle = testButton.style.display;

    expect(cuts).not.toBeTruthy();
    expect(WebCopy.isSupported).toBe(false);
    expect(classes).toBe("webCopy-not-supported");
    expect(displayStyle).toBe("none");

  });

});
