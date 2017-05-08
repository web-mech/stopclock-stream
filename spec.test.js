import test from 'ava';

import stopWatch from '.';

test('Stopwatch', async (t) => {
  var sw = stopWatch();
  let time;
  sw.stream.subscribe((s) => {
    console.log(s);
    time = s;
    t.truthy(s);
  });
  sw.start();
  return new Promise((res, rej) => {
    setTimeout(() => {
      sw.stop();
      setTimeout(() => {
        sw.start();
        setTimeout(() => {
          sw.complete();
          t.is(parseInt(time.split(':')[1], 10), 3, 'This takes about 3 seconds?');
          res();
        }, 2200);
      }, 1999);
    }, 1999);
  })
});