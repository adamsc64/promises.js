/*
A simple promises example in Javascript.

Many thanks to
https://raw.github.com/kriskowal/q/master/design/README.js
for inspiration.

*/

maybeOneOneSecondLater = function() {
 var callbacks = [];
 var future = 1000;
 var value = 1;
 setTimeout(function() {
  setTimeout(function() {
   while (callbacks.length > 0) {
    callback = callbacks.splice(0,1)[0];
    // pops from the beginning rather than top of stack.
    callback(value);
   }
   callbacks = undefined;
  }, future);
 }, 0);
 var then = function(_callback) {
   if (callbacks === undefined) {
    // Late invocation.
    _callback(value);
   } else if (_callback !== undefined) {
    // Early invocation.
    callbacks.push(_callback);
   }
   return {
    "then": then
   };
 };
 return then();
};
