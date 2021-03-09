const {getStringBetween} = require('../getStringBetween')

describe.each([
  ['abcdefg', 'a', 'd', 'bc'],
  ['ababcdefg', 'a', 'd', 'bc'],
  ['ababcdefg', 'ac', 'd', ''],
  ['a\r\nba\r\nbcdefg', 'a\r\n', 'd', 'bc'],
])('test getStringBetween(%s, %s, %s)', (str, start, end, expected) => {
  it(`should return ${expected}`, () => {
    expect(getStringBetween(str, start, end)).toBe(expected)
  })
})
