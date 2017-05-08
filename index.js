const Counter = require('./counter');
const { Observable } = require('rxjs');
const defaultOptions = {
  on: false,
  format: '00',
  delimiter: ':'
};

module.exports = function stopWatch(options) {
  options = Object.assign({}, defaultOptions, options);

  let counter = new Counter({//milsecs
      max: 999,
      format: options.format,
      delimiter: options.delimiter,
      counter: new Counter({//sec
        max: 59,
        counter: new Counter()
      })
  });

  return {
    current() {
      return counter.out();
    },
    complete() {
      options.complete = true;
    },
    reset() {
      options.on = false;
      counter.reset();
    },
    stop() {
      options.on = false;
    },
    start() {
      options.on = true;
    },
    stream: Observable.create(function(observer) {
      observer.next(counter.out());
      let i = setInterval(function() {
        if (options.on) {
          counter.tick();
          observer.next(counter.out());
        }

        if (options.complete) {
          observer.complete();
        }
      }, 1);

     return function() {
      clearInterval(i);
     };
    })
  };
};
