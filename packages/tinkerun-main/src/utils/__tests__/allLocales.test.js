const {allLocales} = require('../allLocales')

test('allLocales should return correct', () => {
  expect(allLocales).toEqual([
    'en', 'zh',
  ])
})
