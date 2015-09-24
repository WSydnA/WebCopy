describe("isSupported", function() {

  var mockNavigator;
  var mockDocument;

  it("returns false for Safari and AppleWebKit", function() {

    mockNavigator = { userAgent: "xxSafari/xx" };
    expect(isSupported(mockNavigator, document)).toEqual(false);

    mockNavigator = { userAgent: "xxAppleWebKit/xx" };
    expect(isSupported(mockNavigator, document)).toBe(false);

  });

  it("returns false for unsupported versions of Chrome", function() {

    mockNavigator = { userAgent: "xxChrome/3xx" };
    expect(isSupported(mockNavigator, document)).toEqual(false);

    mockNavigator = { userAgent: "xxChrome/16.453.13xx" };
    expect(isSupported(mockNavigator, document)).toEqual(false);

    mockNavigator = { userAgent: "xxChrome/41.453.13xx" };
    expect(isSupported(mockNavigator, document)).toEqual(false);

  });

  it("returns true for other versions of Chrome", function() {

    mockNavigator = { userAgent: "xxChrome/42.244xx" };
    expect(isSupported(mockNavigator, document)).toEqual(true);

    mockNavigator = { userAgent: "xxChrome/50.453.13xx" };
    expect(isSupported(mockNavigator, document)).toEqual(true);

    mockNavigator = { userAgent: "xxChrome/999.453.13xx" };
    expect(isSupported(mockNavigator, document)).toEqual(true);

    mockNavigator = { userAgent: "xxChromexx" };
    expect(isSupported(mockNavigator, document)).toEqual(true);

  });

  it("returns true for IE", function() {

    mockNavigator = { userAgent: "xxMSIE xx" };
    expect(isSupported(mockNavigator, document)).toBe(true);

    mockNavigator = { userAgent: "xxTrident/xx" };
    expect(isSupported(mockNavigator, document)).toBe(true);

  });

  it("returns true if the copy function returns a boolean", function() {

    mockNavigator = { userAgent: "" };

    expect(isSupported(mockNavigator, document)).toBe(true);

  });

  it("returns false if document.execCommand does not exist", function() {

    mockNavigator = { userAgent: "" };

    mockDocument = {};

    expect(isSupported(mockNavigator, mockDocument)).toBe(false);

  });

  it("returns false in other cases", function() {

    mockNavigator = { userAgent: "" };

    mockDocument = { execCommand: function() {} };

    expect(isSupported(mockNavigator, mockDocument)).toBe(false);

  });

});
