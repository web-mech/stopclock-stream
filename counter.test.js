import test from 'ava';

import Counter from './counter';

test('Single counter init with default options', (t) => {
  let counter = new Counter();
  t.is(counter.out(), '00', 'Expect single counter output with no seed to be 00');
  counter.tick();
  t.is(counter.out(), '01', 'Expect single counter output with no seed to be 01');
});

test('Counter max', (t) => {
  let counter = new Counter({
    max: 59
  });
  let c = 0;
  while (c < 60) {
    counter.tick();
    c++;
  }
  t.is(counter.out(), '00', 'Expect single counter output with no seed to be 00');
});

test('Counter seed', (t) => {
  let counter = new Counter({
    max: 59,
    seed: 59
  });
  
  t.is(counter.out(), '59', 'Expect single counter output with seed to be 59');

  counter.tick();

  t.is(counter.out(), '00', 'Expect single counter output with seed to be 00');
});

test('Nested counter 1-tier', (t) => {
  let counter = new Counter({
    max: 59,
    seed: 59,
    counter: new Counter()
  });
  
  counter.tick();

  t.is(counter.out(), '01:00', 'Expect single counter output with no seed to be 01:00');
});

test('Nested counter 3-tier', (t) => {
  let counter = new Counter({
    max: 59,
    seed: 59,
    counter: new Counter({
      max: 59,
      seed: 59,
      counter: new Counter()
    })
  });
  
  counter.tick();

  t.is(counter.out(), '01:00:00', 'Expect single counter output with no seed to be 01:00:00');
  counter.tick();
  t.is(counter.out(), '01:00:01', 'Expect single counter output with no seed to be 01:00:01');
  counter.tick();
  t.is(counter.out(), '01:00:02', 'Expect single counter output with no seed to be 01:00:02');
});

test('Counter Reset', (t) => {
  let counter = new Counter({
    max: 59,
    seed: 59,
    counter: new Counter({
      max: 59,
      seed: 59,
      counter: new Counter()
    })
  });
  counter.reset();

  t.is(counter.out(), '00:00:00', 'Expected 3-tier nested counter to look like 00:00:00 after reset');
});

