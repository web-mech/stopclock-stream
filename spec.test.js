import test from 'ava';

import stopWatch from '.';

test('Stopwatch', async (t) => {
  const sw = stopWatch();
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

test('Stopwatch format, also stopwatch current', (t) => {
  const sw = stopWatch({
    format: '000',
    delimiter: '.'
  });
  t.is(sw.current(), '00:00.000', '.current is a thing now. And takes custom formats');
});