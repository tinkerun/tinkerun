import {atom} from 'jotai'

import {inputConnection, getConnection, inputConnectionClearLine} from '../utils/api'
import {minifyPHPCode} from '../utils/minifyPHPCode'

const connectionAtom = atom(getConnection())
const sizesAtom = atom([])
const outputAtom = atom('')
const outputTabIndexAtom = atom(0)
const inputAtom = atom('')

// 执行代码
const runAtom = atom(null, (get, set, code) => {
  if (get(outputTabIndexAtom) !== 1) {
    // 展示 output
    set(outputTabIndexAtom, 1)
  }

  set(outputAtom, '')

  const input = minifyPHPCode(code)

  set(inputAtom, input)

  // 清除命令行已输入的内容
  inputConnectionClearLine()

  inputConnection(`${input}\r`)
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
  outputTabIndexAtom,
  inputAtom,
  runAtom,
  appendOutputAtom,
  clearOutputAtom,
}
