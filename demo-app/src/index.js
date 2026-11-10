'use strict';
// clamp(n, lo, hi): n limited to the range [lo, hi]. Throws if lo > hi.
function clamp(n, lo, hi) {
  if (lo > hi) throw new Error('clamp: lo must not exceed hi');
  return Math.min(Math.max(n, lo), hi);
}
module.exports = { clamp };
