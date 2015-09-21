describe("isSupported", function() {

  var mockNavigator;
  var mockExecCommand = function(arg) {
    if (arg === "copy") {
      return true;
    }
    return false;
  };

  it("returns false for Safari and AppleWebKit", function() {

    mockNavigator = { userAgent: "xxSafarixx" };
    expect(isSupported(mockNavigator, mockExecCommand)).toEqual(false);

    mockNavigator = { userAgent: "xxAppleWebKitxx" };
    expect(isSupported(mockNavigator, mockExecCommand)).toBe(false);

  });

  it("returns true for IE", function() {

    mockNavigator = { userAgent: "xxMSIE xx" };
    expect(isSupported(mockNavigator, mockExecCommand)).toBe(true);

    mockNavigator = { userAgent: "xxTrident/xx" };
    expect(isSupported(mockNavigator, mockExecCommand)).toBe(true);

  });

  it("returns true if the copy function returns a boolean", function() {

    mockNavigator = { userAgent: "xxMSIE xx" };

    expect(isSupported(mockNavigator, mockExecCommand)).toBe(true);

  });

  it("returns false in other cases", function() {

    mockNavigator = { userAgent: "" };

    mockExecCommand = function(arg) {};

    expect(isSupported(mockNavigator, mockExecCommand)).toBe(false);

  });

});
