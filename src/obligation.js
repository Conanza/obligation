function Obligation() {
  this.resultant = undefined;
  this.callbacks = [];
  this.callbackPointer = 0;
}

Obligation.prototype.resolve = function(value) {
  if (this.resultant !== undefined) {
    throw new Error("obligation can only be resolved once");
  }
  this.resultant = value;

  return this;
};

Obligation.prototype.success = function(callback) {
  callback && this.callbacks.push(callback);
  if (this.callbackPointer >= this.callbacks.length) {
    return this;
  }

  if (this.resultant !== undefined) {
    var currentCallback = this.callbacks[this.callbackPointer];
    this.callbackPointer += 1;

    currentCallback(this.resultant);
  }

  setTimeout(function() {
    this.success();
  }.bind(this), 0);

  return this;
};



// TESTS
// var build = new Obligation();
// var zoom = new Obligation();
//
// build.resolve('Helping find contractors');
//
// setTimeout(function() {
//   zoom.resolve('you can trust!');
// }, 250);
//
// build.success(function(result) {
//   console.log(result);
// });
//
// zoom.success(function(result) {
//   console.log(result);
// });
//
// var extraCredit = new Obligation();
//
// var firstCallback = function (result) {
//     console.log('In order to understand ' + result + ',');
// };
//
// var secondCallback = function (result) {
//     console.log(' you must first understand ' + result + '.');
// };
//
// extraCredit
//   .success(firstCallback)
//   .success(secondCallback)
//   .success(firstCallback)
//   .success(secondCallback)
//   .resolve("recursion")
//   .success(secondCallback)
//   .success(firstCallback);
