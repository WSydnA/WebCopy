describe("main", function() {

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

    var testBtn = new WebCopy(textArea, null);
    document.body.appendChild(testBtn);

    var tagName = testBtn.tagName.toUpperCase();
    var styles = window.getComputedStyle(testBtn);

    //expect(tagName).toBe("BUTTON");
    //expect(styles.getPropertyValue("display")).toEqual("inline-block");

  });

});
