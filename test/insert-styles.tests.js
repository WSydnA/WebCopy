describe("insertStyles", function() {

  beforeEach(function() {
    var styles = document.getElementsByTagName("style");
    for (var s = 0; s < styles.length; s++) {
      styles[s].parentNode.removeChild(styles[s]);
    }
  });

  it("inserts a style tag when WebCopy is supported", function() {

    insertStyles(true);
    var styles = document.getElementsByTagName("style");

    expect(styles.length).toEqual(1);

  });

  it("inserts a style tag when WebCopy is not supported", function() {

    insertStyles(false);
    var styles = document.getElementsByTagName("style");

    expect(styles.length).toEqual(1);

  });

  it("displays WebCopy buttons when WebCopy is supported", function() {

    insertStyles(true);
    var testBtn = document.createElement("button");
    testBtn.classList.add("webCopy");
    document.body.appendChild(testBtn);

    var btnStyles = window.getComputedStyle(testBtn);

    expect(btnStyles.getPropertyValue("display")).toBe("inline-block");

  });

  it("hides WebCopy buttons when WebCopy is not supported", function() {

    insertStyles(false);
    var testBtn = document.createElement("button");
    testBtn.classList.add("webCopy");
    testBtn.classList.add("webCopy-not-supported");
    document.body.appendChild(testBtn);

    var btnStyles = window.getComputedStyle(testBtn);

    expect(btnStyles.getPropertyValue("display")).toBe("none");

  });

});
