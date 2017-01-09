var Rx = require('rxjs');
var fs = require('fs');
// From one or multiple values
// Rx.Observable.of('foo', 'bar');

// // From array of values
// Rx.Observable.from([1,2,3]);

// // From an event
// //Rx.Observable.fromEvent(document.querySelector('button'), 'click');

// // From a Promise
// //Rx.Observable.fromPromise(fetch('/users'));

// // From a callback (last argument is a callback)
// // fs.exists = (path, cb(exists))
// var exists = Rx.Observable.bindCallback(fs.exists);
// exists('file.txt').subscribe(exists => console.log('Does file exist?', exists));

// // From a callback (last argument is a callback)
// // fs.rename = (pathA, pathB, cb(err, result))
// var rename = Rx.Observable.bindNodeCallback(fs.rename);
// rename('file.txt', 'else.txt').subscribe(() => console.log('Renamed!'));


// Creating observables
//Externally produce new events.
var myObservable = new Rx.Subject();
myObservable.subscribe(value => console.log(value),error => console.log('error'),() => console.log('done'));
myObservable.next('foo');
myObservable.next('bar');
myObservable.complete();

// Internally produce new events
var myObservable = Rx.Observable.create(function(observer) {
  observer.next('foo');
  observer.next('bar');
  observer.complete('done');
})
myObservable.subscribe(value => console.log(value), error => console.log('error'), () => console.log('done'));

