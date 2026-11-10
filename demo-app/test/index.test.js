'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { clamp } = require('../src/index.js');
test('inside the range', () => assert.strictEqual(clamp(5, 0, 10), 5));
test('below the range', () => assert.strictEqual(clamp(-3, 0, 10), 0));
test('above the range', () => assert.strictEqual(clamp(30, 0, 10), 10));
test('lo above hi throws', () => assert.throws(() => clamp(1, 5, 2), /lo must not exceed hi/));
