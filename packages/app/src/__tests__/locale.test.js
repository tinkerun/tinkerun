const {getIntl} = require('../locale')

test('getIntl should not return null', () => {
  expect(getIntl()).not.toBeNull()
})
