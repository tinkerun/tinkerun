import compact from 'lodash/compact'
import join from 'lodash/join'

/**
 * 删除注释，并且把代码变成一行
 *
 * @param {string} code
 * @return {string}
 */
export const minifyPHPCode = code => {
  // 删除多行和内嵌注释
  code = code.replace(/\/\*(.|\r|\n)*?\*\//g, '')
  // 删除单行注释
  code = code.replace(/(\/\/|#).*/g, '')
  // 合并成一行代码
  return join(compact(
    code.split('\n').map(c => c.trim()),
    // @warning 合并字符串需要一个空格，如果是多行字符串，当需要执行多行 SQL 的时候
  ), ' ')
}
