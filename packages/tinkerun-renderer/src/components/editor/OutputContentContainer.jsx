import {useState} from 'react'
import {createContainer} from 'unstated-next'
import last from 'lodash/last'

const useOutputContent = () => {
  const [outputContent, setOutputContent] = useState('')
  const [input, setInput] = useState('')

  const appendOutputContent = content => {
    setOutputContent(prevState => `${prevState}${content}`)
  }

  const clearOutputContent = () => {
    setOutputContent('')
    setInput('')
  }

  // 处理 pty 返回的数据，使之只显示内容
  const getOutputContent = () => {
    let output = outputContent
    if (input) {
      const lastLine = last(input.split('\\\n'))
      output = last(outputContent.split(`${lastLine}\r\n`))
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

  return {
    outputContent,
    appendOutputContent,
    clearOutputContent,
    getOutputContent,
    setInput,
  }
}

const OutputContentContainer = createContainer(useOutputContent)

export default OutputContentContainer
