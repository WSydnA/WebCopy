describe("elementIsValid", function() {

  it("returns false for null or undefined elements", function() {

    var testEl;
    expect(elementIsValid(testEl)).toBe(false);

    testEl = null;
    expect(elementIsValid(testEl)).toBe(false);

  });

  it("returns false for elements not in the document body", function() {

    var testEl = document.createElement("input");
    expect(elementIsValid(testEl)).toBe(false);

  });

  it("returns false for the document body", function() {

    var testEl = document.body;
    expect(elementIsValid(testEl)).toBe(false);

  });

  it("returns false for disallowed element types", function() {

    var testP = document.createElement("p");
    var testDiv = document.createElement("div");
    var testSpan = document.createElement("span");
    var testUl = document.createElement("ul");

    document.body.appendChild(testP);
    document.body.appendChild(testDiv);
    document.body.appendChild(testSpan);
    document.body.appendChild(testUl);

    expect(elementIsValid(testP)).toBe(false);
    expect(elementIsValid(testDiv)).toBe(false);
    expect(elementIsValid(testSpan)).toBe(false);
    expect(elementIsValid(testUl)).toBe(false);

  });

  it("returns true for inputs and textareas", function() {

    var testInput = document.createElement("input");
    var testTextarea = document.createElement("textarea");

    document.body.appendChild(testInput);
    document.body.appendChild(testTextarea);

    expect(elementIsValid(testInput)).toBe(true);
    expect(elementIsValid(testTextarea)).toBe(true);

  });

  it("returns true for contentEditable elements", function() {

    var testP = document.createElement("p");
    var testDiv = document.createElement("div");
    var testSpan = document.createElement("span");
    var testUl = document.createElement("ul");

    testP.setAttribute("contentEditable", true);
    testDiv.setAttribute("contentEditable", true);
    testSpan.setAttribute("contentEditable", true);
    testUl.setAttribute("contentEditable", true);

    document.body.appendChild(testP);
    document.body.appendChild(testDiv);
    document.body.appendChild(testSpan);
    document.body.appendChild(testUl);

    expect(elementIsValid(testP)).toBe(true);
    expect(elementIsValid(testDiv)).toBe(true);
    expect(elementIsValid(testSpan)).toBe(true);
    expect(elementIsValid(testUl)).toBe(true);

  });

});
