var test = require('tape')

const target = require('../aggregate')

test('test', (t) => {
  const labels = ['A', 'b', 'd']
  const input = {'a':[0,0], 'b': [0,1], 'c': [0,1], 'd': [0,1] }
  const expect = {'a':[0,0], 'b': [0,1], 'b, A': [0,1], 'c': [0,1], 'd': [0,1], 'd, A': [0,1], 'A': [0,2] }

  t.deepEqual(target(input, labels), expect)
  t.end()
});

test('test', (t) => {
  const input = {'a':[0,0], 'b': [0,1] }
  const expect = {'a':[0,0], 'b': [0,1] }

  t.deepEqual(target(input), expect)
  t.end()
});

test('test', (t) => {
  const labels = ['A', 'b', 'd', 'e']
  const input = {'a':[0,0], 'b': [0,1], 'c': [0,1], 'd': [0,1], 'e': [2,5], 'f': [0,2], 'g': [0,1] }
  const expect = {'a':[0,0], 'b': [0,1], 'b, A': [0,1], 'c': [0,1], 'd': [0,1], 'd, A': [0,1], 'e': [2,5], 'e, A': [2,5], 'A': [2,7], 'f': [0,2], 'g': [0,1] }

  t.deepEqual(target(input, labels), expect)
  t.end()
});
