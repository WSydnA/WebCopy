describe("cutsTheMustard", function() {

  it("returns true in modern browsers", function() {

    var cuts = cutsTheMustard();

    expect(cuts).toBeTruthy();

  });

  it("returns false in old browsers", function() {

    window.addEventListener = undefined;
    var cuts = cutsTheMustard();

    expect(cuts).not.toBeTruthy();

  });

});
