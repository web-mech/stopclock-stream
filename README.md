# stopwatch-stream

A streaming human readable stopwatch. 

Exposes an RxJS [Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)

## Default Format

```
00:00:00
```

## Usage;

```
const stopWatch = require('stopwatch-stream');
const sw = stopWatch();
```

### Basic
```
sw.stream.subscribe((s) => {
	console.log(s); //00:00:00 ...
});
sw.start();
```

### Pausing

```
sw.stream.subscribe((s) => {
	console.log(s);
});

sw.start();

sw.stop();
```

### Current

```
sw.current(); // 00:00:00
```

### Cleanup

```
sw.stream.subscribe((s) => {
	console.log(s);
});

sw.start();

sw.stop();

sw.complete();
```

### Options

#### Stream on init

```
const sw = stopWatch({
	on: true
});

sw.stream.subscribe((s) => {
	console.log(s);
});

```

#### Stopwatch format

```
 const sw = stopWatch({
    format: '000',
    delimiter: '.'
  });
 sw.current(); // '00:00.000'

```