import last from 'lodash/last'
import escapeRegExp from 'lodash/escapeRegExp'

/**
 * 过滤出命令行的输出内容
 *
 * @param {string} output
 * @param {[string]} input
 * @returns {string|*}
 */
export const filterOutput = (output, input = []) => {
  if (input.length > 0) {
    // 如果是点击 run，则有 input，则需要处理将 input 过滤掉，来得到 output
    const lastLine = last(input)
    const reg = new RegExp(`${escapeRegExp(lastLine)}\r+\n`)
    output = last(output.split(reg))
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
}
