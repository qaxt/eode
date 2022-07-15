const _ = require('./dist/index.js')

console.log(_.chunk([0, 'text', [], {}], 3))
// [[0, 'text', []], [{}]]

console.log(_.equal([], []))
console.log(_.equal([0, 'text'], [0, 'text']))
console.log(_.equal([0, 'text', [], {}], [0, 'text', [], {}]))
console.log(_.equal({}, {}))
console.log(_.equal({ a: 0 }, { a: 0 }))
console.log(_.equal({ a: 0, b: [] }, { a: 0, b: [] }))
// true

const users = [
  {
    name: 'John',
    age: 18,
    deleted: false
  },
  {
    name: 'Jane',
    age: 13,
    deleted: false
  },
  {
    name: 'Bob',
    age: 69,
    deleted: true
  },
]

console.log(_.filter(users, _.must({ age: '> 16' })))
// [{ name: 'John', age: 18, deleted: false }, { name: 'Bob', age: 69, deleted: true }]
console.log(_.filter(users, { age: 13 })) // _.matches shorthand
// [{ name: 'Jane', age: 18, deleted: false }]
console.log(_.filter(users, ['name', 'John'])) // _.matchesProperty shorthand
// [{ name: 'John', age: 18, deleted: false }]
console.log(_.filter(users, 'deleted')) // _.property shorthand
// [{ name: 'Bob', age: 69, deleted: true }]

console.log(_.distill(users, _.must({ age: ['&&', '>= 13', '<= 18'] })))
// [[John, Jane], [Bob]]
console.log(_.distill(users, { age: 18 })) // _.matches shorthand
// Array of length 2
console.log(_.distill(users, ['name', 'John'])) // _.matchesProperty shorthand
// Array of length 2
console.log(_.distill(users, 'deleted')) // _.property shorthand
// Array of length 2

console.log(_.includes([0, 'text', [], {}], {}))
// true

console.log(_.unite([0, 'text', [], {}], [0, 'text'], [0, 'text', [], {}]))
// [0, 'text', [], {}, 0, 'text', 0, 'text', [], {}]
console.log(_.unite([0, 'text', [], {}], 'string'))
// [0, 'text', [], {}, 'string']

console.log(_.subtract([0, 'text', [], {}, [0, 1]], [0, []], [{}]))
// ['text', [0, 1]]

console.log(_.intersect([0, 'text', [], {}], [0, 'text'], ['text', {}]))
// ['text', 'text', 'text']

console.log(_.exclude([0, 'text', [], {}], [0, 'text'], ['text', {}]))
// [[]]

console.log(_.mapKeys({ apple: 'alpha', ball: 'beta' }, k => k[0]))
// { a: 'alpha', b: 'beta' }

console.log(_.mapValues({ apple: 'alpha', ball: 'beta' }, v => v[0]))
// { apple: 'a', ball: 'b' }