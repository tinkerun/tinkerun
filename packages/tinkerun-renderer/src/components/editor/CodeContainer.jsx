import {useState} from 'react'
import {createContainer} from 'unstated-next'

import OutputContainer from './OutputContainer'
import {inputConnection} from '../../utils/api'

const useEditor = (initialState = '') => {
  const [code, setCode] = useState(initialState)
  const {clearOutputContent, setInput} = OutputContainer.useContainer()

  const runCode = value => {
    clearOutputContent()

    const input = value.replaceAll('\n', '\\\n')
    setInput(input)

    inputConnection(`${input}\r`)
  }

  return {
    code,
    setCode,
    runCode,
  }
}

export default createContainer(useEditor)
