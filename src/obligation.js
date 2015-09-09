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
