import {isMatchShortcut} from '../isMatchShortcut'

describe.each([
  [new window.KeyboardEvent('', {key: 'r', ctrlKey: true}), ['Control', 'r'], true],
  [new window.KeyboardEvent('', {key: 'r', ctrlKey: true, shiftKey: true}), ['Control', 'Shift', 'r'], true],
  [new window.KeyboardEvent('', {key: 'r', metaKey: true}), ['Control', 'r'], false],
])('test isMatchShortcut(%s, %s)', (event, shortcuts, expected) => {
  test(`should be ${expected}`, () => {
    expect(isMatchShortcut(event, shortcuts)).toBe(expected)
  })
})
