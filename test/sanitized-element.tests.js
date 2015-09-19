describe("sanitizedElement", function() {

  it("returns a DOM element unchanged", function() {

    var testElement = document.createElement("input");
    document.body.appendChild(testElement);

    var cleanedElement = sanitizedElement(testElement);

    expect(cleanedElement).toEqual(testElement);

  });

  it("returns a DOM element if given a valid selector", function() {

    var testElement = document.createElement("input");
    testElement.id = "test-element";
    document.body.appendChild(testElement);

    var cleanedElement = sanitizedElement("#test-element");

    expect(cleanedElement).toEqual(testElement);

  });

  it("returns a DOM element if given a jQuery-like array of DOM elements", function() {

    var testElement1 = document.createElement("input");
    testElement1.id = "test-element-1";
    document.body.appendChild(testElement1);

    var testElement2 = document.createElement("input");
    testElement2.id = "test-element-2";
    document.body.appendChild(testElement2);

    var elements = [testElement1, testElement2];
    var cleanedElement = sanitizedElement(elements);

    expect(cleanedElement).toEqual(testElement1);

  });

  it("returns null if no DOM element, array or identifier is provided", function() {

    var testElement;
    var cleanedElement = sanitizedElement(testElement);
    expect(cleanedElement).toEqual(null);

    testElement = null;
    cleanedElement = sanitizedElement(testElement);
    expect(cleanedElement).toEqual(null);

    testElement = 101;
    cleanedElement = sanitizedElement(testElement);
    expect(cleanedElement).toEqual(null);

  });

});
