describe("ClassModifier", function() {

  var modifyClasses = new ClassModifier();

  describe(".add", function() {

    it("adds single classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        class1: "test-class-1",
        class2: "test-class-2",
        class3: "test-class-3",
      };

      modifyClasses.add(el, test.class1);
      expect(el.className).toBe(test.class1);

      modifyClasses.add(el, test.class2);
      expect(el.className).toBe(test.class1 + " " + test.class2);

      modifyClasses.add(el, test.class3);
      expect(el.className).toBe(test.class1 + " " + test.class2 + " " + test.class3);

    });

    it("adds multiple classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        classGroup1: "test-class-1 test-class-2",
        classGroup2: "test-class-3 test-class-4 test-class-5",
      };

      modifyClasses.add(el, test.classGroup1);
      expect(el.className).toBe(test.classGroup1);

      modifyClasses.add(el, test.classGroup2);
      expect(el.className).toBe(test.classGroup1 + " " + test.classGroup2);

    });

  });

  describe(".remove", function() {

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

      modifyClasses.remove(el, test.class2);
      expect(el.className).toBe(test.class1 + " " + test.class3);

      modifyClasses.remove(el, test.class1);
      expect(el.className).toBe(test.class3);

      modifyClasses.remove(el, test.class3);
      expect(el.className).toBe("");

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

      modifyClasses.remove(el, test.class1 + " " + test.class3);
      expect(el.className).toBe(test.class2 + " " + test.class4);

      modifyClasses.remove(el, test.class2 + " " + test.class4);
      expect(el.className).toBe("");

    });

    it("removes conflicting classes correctly", function() {

      var el = document.createElement("span");
      var test = {
        class1: "ready",
        class2: "readyready"
      };

      // Multiple calls because of classList bug in PhantomJS
      // https://github.com/ariya/phantomjs/issues/12782
      el.classList.add(test.class1);
      el.classList.add(test.class2);

      modifyClasses.remove(el, test.class1);
      expect(el.className).toBe("readyready");

    });

  });

  describe(".add and .remove", function() {
  
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

      expect(el.className).toBe("");

      modifyClasses.add(el, test.class1 + " " + test.class2);
      expect(el.className).toBe(test.class1 + " " + test.class2);

      modifyClasses.remove(el, test.class2);
      expect(el.className).toBe(test.class1);

      modifyClasses.add(el, test.class3);
      expect(el.className).toBe(test.class1 + " " + test.class3);

      modifyClasses.remove(el, test.class1 + " " + test.class2 + " " + test.class3 + " " + test.class4);
      expect(el.className).toBe("");

    });

  });

});
