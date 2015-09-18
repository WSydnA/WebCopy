describe("Defaults", function() {

  var testDefaults = new Defaults();
  var settings = testDefaults.settings;
  var buttonContent = testDefaults.buttonContent;
  var buttonClasses = testDefaults.buttonClasses;

  it("contains expected default settings", function() {

    expect(settings.focusData).toBe(false);
    expect(settings.buttonContent).toEqual({});
    expect(settings.buttonClasses).toEqual({});

  });

  it("contains expected default button content", function() {

    expect(buttonContent.ready).toEqual("Copy");
    expect(buttonContent.done).toEqual("Copied");
    expect(buttonContent.error).toEqual("Failed");

  });

  it("contains expected default button classes", function() {

    expect(buttonClasses.ready).toBe("webCopy");
    expect(buttonClasses.done).toEqual("webCopy webCopy-done");
    expect(buttonClasses.error).toEqual("webCopy webCopy-error");

  });

});
