import {atom} from 'jotai'
import last from 'lodash/last'
import compact from 'lodash/compact'

import {inputConnection} from '../utils/api'

const sizesAtom = atom([])
const outputAtom = atom('')
const tabIndexAtom = atom(0)
const inputAtom = atom('')

// 执行代码
const runAtom = atom(null, (get, set, code) => {
  // 展示 output
  set(tabIndexAtom, 1)
  set(outputAtom, '')
  let codeArr = code.split('\n')
  codeArr = compact(codeArr)
  code = codeArr.join('\\\n')
  set(inputAtom, code)

  inputConnection(`${code}\r`)
})

// 增加 output 数据
const appendOutputAtom = atom(null, (get, set, update) => {
  set(outputAtom, prev => `${prev}${update}`)
})

// 清空 output
const clearOutputAtom = atom(null, (get, set, update) => {
  set(outputAtom, '')
})

// 过滤 output 的数据
const outputFilteredAtom = atom(
  get => {
    let output = get(outputAtom)
    const input = get(inputAtom)

    if (input) {
      // 如果是点击 run，则有 input，则需要处理将 input 过滤掉，来得到 output
      const lastLine = last(input.split('\\\n'))
      output = last(output.split(`${lastLine}\r\n`))
    }

    const outputArr = output.split('\r\n')
    if (outputArr.length <= 1) {
      return ''
    }

    if (!outputArr[0]) {
      // 第一行为空，则删除
      outputArr.shift()
    }

    outputArr.pop()

    return outputArr.join('\r\n')
  },
)

export {
  sizesAtom,
  outputAtom,
  tabIndexAtom,
  inputAtom,
  runAtom,
  outputFilteredAtom,
  appendOutputAtom,
  clearOutputAtom,
}
