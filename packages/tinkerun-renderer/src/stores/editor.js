import {atom} from 'jotai'
import compact from 'lodash/compact'

import {inputConnection, getConnection} from '../utils/api'

const connectionAtom = atom(getConnection())
const sizesAtom = atom([])
const outputAtom = atom('')
const tabIndexAtom = atom(0)
const inputAtom = atom([])

// 执行代码
const runAtom = atom(null, (get, set, code) => {
  if (get(tabIndexAtom) !== 1) {
    // 展示 output
    set(tabIndexAtom, 1)
  }

  set(outputAtom, '')
  let codeArr = code.split('\n')
  codeArr = compact(codeArr)
  set(inputAtom, codeArr)

  // 清除命令行已输入的内容
  inputConnection('\u0015')

  for (const codeItem of codeArr) {
    inputConnection(`${codeItem}\r`)
  }
})

// 增加 output 数据
const appendOutputAtom = atom(null, (get, set, update) => {
  set(outputAtom, prev => `${prev}${update}`)
})

// 清空 output
const clearOutputAtom = atom(null, (get, set, update) => {
  set(outputAtom, '')
})

export {
  connectionAtom,
  sizesAtom,
  outputAtom,
  tabIndexAtom,
  inputAtom,
  runAtom,
  appendOutputAtom,
  clearOutputAtom,
}
