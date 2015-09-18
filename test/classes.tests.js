describe("classes", function() {

  it("adds and then removes classes correctly", function() {

    var el = document.createElement("span");
    var test = {
      class1: "test-class-1",
      class2: "test-class-2",
      class3: "test-class-3",
      class4: "test-class-4",
    };

    // Multiple calls because of classList bug in PhantomJS
    // https://github.com/ariya/phantomjs/issues/12782

    expect(el.classList.toString()).toBe("");

    addClasses(el, test.class1 + " " + test.class2);
    expect(el.classList.toString()).toBe(test.class1 + " " + test.class2);

    removeClasses(el, test.class2);
    expect(el.classList.toString()).toBe(test.class1);

    addClasses(el, test.class3);
    expect(el.classList.toString()).toBe(test.class1 + " " + test.class3);

    removeClasses(el, test.class1 + " " + test.class2 + " " + test.class3 + " " + test.class4);
    expect(el.classList.toString()).toBe("");

  });

  describe("addClasses", function() {

    it("adds single classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        class1: "test-class-1",
        class2: "test-class-2",
        class3: "test-class-3",
      };

      addClasses(el, test.class1);
      expect(el.classList.toString()).toBe(test.class1);

      addClasses(el, test.class2);
      expect(el.classList.toString()).toBe(test.class1 + " " + test.class2);

      addClasses(el, test.class3);
      expect(el.classList.toString()).toBe(test.class1 + " " + test.class2 + " " + test.class3);

    });

    it("adds multiple classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        classGroup1: "test-class-1 test-class-2",
        classGroup2: "test-class-3 test-class-4 test-class-5",
      };

      addClasses(el, test.classGroup1);
      expect(el.classList.toString()).toBe(test.classGroup1);

      addClasses(el, test.classGroup2);
      expect(el.classList.toString()).toBe(test.classGroup1 + " " + test.classGroup2);

    });

  });

  describe("removeClasses", function() {

    it("removes single classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        class1: "test-class-1",
        class2: "test-class-2",
        class3: "test-class-3",
      };

      // Multiple calls because of classList bug in PhantomJS
      // https://github.com/ariya/phantomjs/issues/12782
      el.classList.add(test.class1);
      el.classList.add(test.class2);
      el.classList.add(test.class3);

      removeClasses(el, test.class2);
      expect(el.classList.toString()).toBe(test.class1 + " " + test.class3);

      removeClasses(el, test.class1);
      expect(el.classList.toString()).toBe(test.class3);

      removeClasses(el, test.class3);
      expect(el.classList.toString()).toBe("");

    });

    it("removes multiple classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        class1: "test-class-1",
        class2: "test-class-2",
        class3: "test-class-3",
        class4: "test-class-4",
      };

      // Multiple calls because of classList bug in PhantomJS
      // https://github.com/ariya/phantomjs/issues/12782
      el.classList.add(test.class1);
      el.classList.add(test.class2);
      el.classList.add(test.class3);
      el.classList.add(test.class4);

      removeClasses(el, test.class1 + " " + test.class3);
      expect(el.classList.toString()).toBe(test.class2 + " " + test.class4);

      removeClasses(el, test.class2 + " " + test.class4);
      expect(el.classList.toString()).toBe("");

    });

  });

});
