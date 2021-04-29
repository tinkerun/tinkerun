/**
 * 删除注释，并且把代码变成一行
 *
 * @param {string} code
 * @return {string}
 */
export const minifyPHPCode = code => {
  return code.trim().replace(/\n/g, '\\\n')
}
