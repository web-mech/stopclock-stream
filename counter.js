const defaultOptions = {
  count: 0,
  seed: 0,
  max: false,
  counter: undefined
};

function Counter(options) {
  Object.assign(this, defaultOptions, options || {})
  
  while (!!~(--(this.seed))) {
   this.tick();
  }
}

Counter.prototype.tick = function tick() {
    if (this.count === this.max) {
      this.count = 0;
      if (this.counter) {
        this.counter.tick();
      }
      return this.count;
    }
    return this.count++;
};

Counter.prototype.out = function out() {
  var o = ''+this.count;
  var localOut = ('00'+o).substring(o.length);
  if (this.counter) {
    return [ this.counter.out(), localOut ].join(':'); 
  }
  return localOut;
};

Counter.prototype.reset = function reset() {
  this.count = 0;
  if (this.counter) {
    this.counter.reset();
  }
};

module.exports = Counter;


