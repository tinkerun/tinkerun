import {useState} from 'react'
import {createContainer} from 'unstated-next'
import last from 'lodash/last'

const useOutput = () => {
  const [outputContent, setOutputContent] = useState('')
  const [input, setInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const appendOutputContent = content => {
    if (!isConnected) {
      // 如果没有连接上则绑定 setConnected 事件，等待 >>> 字符串
      // PsySH 的默认提示符为 >>>
      // https://github.com/bobthecow/psysh/blob/main/src/Shell.php#L53
      if (content.indexOf('>>>') >= 0) {
        setIsConnected(true)
      }
    }

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
      // 如果是点击 run，则有 input，则需要处理将 input 过滤掉，来得到 output
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
    isConnected,
    setIsConnected,
  }
}

const OutputContainer = createContainer(useOutput)

export default OutputContainer
