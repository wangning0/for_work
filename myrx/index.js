var Rx = require('rxjs');
/*
var observable = Rx.Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err); // delivers an error if it caught one
  }
});


observable.subscribe({
  next: (x) => console.log(x),
  complete: () => console.log('done'),
  error: (err) => console.log(err)
})*/


// var observable1 = Rx.Observable.interval(400);
// var observable2 = Rx.Observable.interval(300);

// var subscription = observable1.subscribe(x => console.log('first :' + x));
// var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

// subscription.add(childSubscription);

// setTimeout(() => {
//   // Unsubscribes BOTH subscription and childSubscription
//   subscription.unsubscribe();
// }, 1000);


// var subject = new Rx.Subject();

// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// })
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// })

// var observable = Rx.Observable.from([1, 2, 3]);
// observable.subscribe(subject);

// auto-complete
// const Observable = Rx.Observable  
// const input = document.querySelector('input')

// const search$ = Observable.fromEvent(input, 'input')  
//   .map(e => e.target.value)
//   .filter(value => value.length >= 1)
//   .throttleTime(100)
//   .distinctUntilChanged()
//   .switchMap(term => Observable.fromPromise(wikiIt(term)))
//   .subscribe(
//     x => renderSearchResult(x),
//     err => console.error(err)
//   )

 var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
})
.observeOn(Rx.Scheduler.async);
// 可以去掉上面一行来得到相对应的结果
console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');
  
// /*
// var observable = Rx.Observable.create(function subscribe(observer) {
//   try {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.complete();
//   } catch (err) {
//     observer.error(err); // delivers an error if it caught one
//   }
// });


// observable.subscribe({
//   next: (x) => console.log(x),
//   complete: () => console.log('done'),
//   error: (err) => console.log(err)
// })*/


// // var observable1 = Rx.Observable.interval(400);
// // var observable2 = Rx.Observable.interval(300);

// // var subscription = observable1.subscribe(x => console.log('first :' + x));
// // var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

// // subscription.add(childSubscription);

// // setTimeout(() => {
// //   // Unsubscribes BOTH subscription and childSubscription
// //   subscription.unsubscribe();
// // }, 1000);


// // var subject = new Rx.Subject();

// // subject.subscribe({
// //   next: (v) => console.log('observerA: ' + v)
// // })
// // subject.subscribe({
// //   next: (v) => console.log('observerB: ' + v)
// // })

// // var observable = Rx.Observable.from([1, 2, 3]);
// // observable.subscribe(subject);

// // auto-complete
// // const Observable = Rx.Observable  
// // const input = document.querySelector('input')

// // const search$ = Observable.fromEvent(input, 'input')  
// //   .map(e => e.target.value)
// //   .filter(value => value.length >= 1)
// //   .throttleTime(100)
// //   .distinctUntilChanged()
// //   .switchMap(term => Observable.fromPromise(wikiIt(term)))
// //   .subscribe(
// //     x => renderSearchResult(x),
// //     err => console.error(err)
// //   )

//  var observable = Rx.Observable.create(function (observer) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.complete();
// })
// .observeOn(Rx.Scheduler.async);

// console.log('just before subscribe');
// observable.subscribe({
//   next: x => console.log('got value ' + x),
//   error: err => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });
// console.log('just after subscribe');
  


// Rx.Observable
// .from(['Adrià', 'Jen', 'Sergi','wangning'])
// .subscribe(
// function(x) { console.log('Next: ' + x); },
// function(err) { console.log('Error:', err); },
// function() { console.log('Completed'); }
// ); 

//Rx.Observable.range(1, 5).map(value => value * 2).filter(value => value >= 4).subscribe(value => console.log(value));

// var avg = Rx.Observable.range(0, 5)
// .reduce(function(prev, cur) {
// return {
// sum: prev.sum + cur,
// count: prev.count + 1
// };
// }, { sum: 0, count: 0 })
// .map(function(o) {
// return o.sum / o.count;
// });
// var subscription = avg.subscribe(function(x) {
// console.log('Average is: ', x);
// });

// var avg = Rx.Observable.interval(1000)
// .scan(function (prev, cur) {
// return {
// sum: prev.sum + cur,
// count: prev.count + 1
// };
// }, { sum: 0, count: 0 })
// .map(function(o) {
// return o.sum / o.count;
// });
// var subscription = avg.subscribe( function (x) {
// console.log(x);
// });

var avg = Rx.Observable.range(0, 5)
  .reduce((prev, cur) => ({
    sum: prev.sum + cur,
    count: prev.count + 1
  }),{
    sum: 0,
    count: 0
  })
  .map( value => value.sum/value.count)
  .subscribe(value => console.log(value));

var avg = Rx.Observable.range(0, 5)
  .scan((prev, cur) => ({
    sum: prev.sum + cur,
    count: prev.count + 1
  }),{
    sum: 0,
    count: 0
  })
  .map( value => value.sum/value.count)
  .subscribe(value => console.log(value));






