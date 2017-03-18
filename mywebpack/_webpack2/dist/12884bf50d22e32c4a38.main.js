webpackJsonp([1,2],{

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

function determineDate() {
  Promise.resolve().then(__webpack_require__.bind(null, 0)).then(function(moment) {
    console.log(moment().format());
  }).catch(function(err) {
    console.log('Failed to load moment', err);
  });
}

determineDate();

/***/ })

},[111]);