describe("isSupported", function() {

  var mockNavigator;
  var mockDocument;

  it("returns false for Safari and AppleWebKit", function() {

    mockNavigator = { userAgent: "xxSafarixx" };
    expect(isSupported(mockNavigator, document)).toEqual(false);

    mockNavigator = { userAgent: "xxAppleWebKitxx" };
    expect(isSupported(mockNavigator, document)).toBe(false);

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

  it("returns false in other cases", function() {

    mockNavigator = { userAgent: "" };

    mockDocument = { execCommand: function() {} };

    expect(isSupported(mockNavigator, mockDocument)).toBe(false);

  });

});
