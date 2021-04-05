import {filterOutput} from '../filterOutput'

describe.each([
  ['input\r\nexpected\r\n', 'input', 'expected'],
  ['input\r\r\nexpected\r\n', 'input', 'expected'],
  ['input\r\r\nexpected\r\n>>>', 'input', 'expected'],
  ['input\r\nexpected\r\nexpected\r\n>>>', 'input', 'expected\r\nexpected'],
  ['input\r\nexpected\r\n \bexpected\r\n>>>', 'input', 'expected\r\nexpected'],
  ['input\r\nex \bpected\r\n \bexpected\r\n>>>', 'input', 'expected\r\nexpected'],
  ['----->>>input\r\nex \bpected\r\n \bexpected\r\n>>>', 'input', 'expected\r\nexpected'],
  ['----->>>inputinput\r\nex \bpected\r\n \bexpected\r\n>>>', 'input', 'expected\r\nexpected'],
])('test filterOutput(%s, %s)', (output, input, expected) => {
  test(`should be ${expected}`, () => {
    expect(filterOutput(output, input)).toBe(expected)
  })
})
