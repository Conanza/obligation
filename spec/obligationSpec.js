describe("Obligation", function() {
  var testObligation;

  beforeEach(function() {
    testObligation = new Obligation();
  });

  it("should be initialized with no resulting value", function() {
    expect(testObligation.resultant).toBeFalsy();
  });

  it("should resolve only once", function() {
    expect(function() {
      testObligation.resolve("first");
      testObligation.resolve("second");
    }).toThrowError("obligation can only be resolved once");
  });

  describe("after resolving", function() {
    var myvar, firstCallback, anotherCallback;

    beforeEach(function() {
      myvar = 1;
      firstCallback = function(result) {
        myvar += result;
      };
      anotherCallback = function(result) {
        myvar *= result;
      };
    });

    it("should call callbacks in the correct order", function() {
      testObligation.resolve(3).success(firstCallback).success(anotherCallback);
      expect(myvar).toEqual(12);
    });

    it("should call multiple callbacks correctly", function() {
      testObligation
        .resolve(3)
        .success(anotherCallback)
        .success(firstCallback)
        .success(anotherCallback);

      expect(myvar).toEqual(18);
    });
  });

  describe("when resolving asynchronously", function() {
    var myvar, firstCallback, secondCallback;

    beforeEach(function(done) {
      myvar = 1;
      firstCallback = function(result) {
        myvar += result;
      };
      secondCallback = function(result) {
        myvar *= result;
        done();
      };
      testObligation.success(firstCallback).success(secondCallback).resolve(10);
    });

    it("still works correctly", function() {
      expect(myvar).toEqual(110);
    });
  });
});
