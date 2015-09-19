describe("getContentString", function() {

  var readySpanClass = "webCopy-ready-content";
  var doneSpanClass = "webCopy-done-content";
  var errorSpanClass = "webCopy-error-content";

  it("returns correct content string given valid object", function() {

    var testString = getContentString({
      ready: "Ready",
      done: "I am Done",
      error: "<span class='icon-error'>Error</span>"
    });

    expect(testString).toEqual(
      "<span class='" + readySpanClass + "'>Ready</span>" +
      "<span class='" + doneSpanClass + "'>I am Done</span>" +
      "<span class='" + errorSpanClass + "'><span class='icon-error'>Error</span></span>"
    );

  });

  it("returns content string even when given invalid properties", function() {

    var testString = getContentString({
      notReady: "Ready",
      done: "I am Done",
      fail: "<span class='icon-error'>Error</span>"
    });

    expect(testString).toEqual(
      "<span class='" + readySpanClass + "'>{WebCopy error}</span>" +
      "<span class='" + doneSpanClass + "'>I am Done</span>" +
      "<span class='" + errorSpanClass + "'>{WebCopy error}</span>"
    );

  });

  it("returns content string even when given invalid object", function() {

    var expected = "<span class='" + readySpanClass + "'>{WebCopy error}</span>" +
                   "<span class='" + doneSpanClass + "'>{WebCopy error}</span>" +
                   "<span class='" + errorSpanClass + "'>{WebCopy error}</span>";

    var testString = getContentString(undefined);
    expect(testString).toEqual(expected);

    testString = getContentString(null);
    expect(testString).toEqual(expected);

    testString = getContentString("not an object");
    expect(testString).toEqual(expected);

  });

});
