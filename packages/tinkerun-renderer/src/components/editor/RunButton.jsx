import {Button, majorScale, PlayIcon} from 'evergreen-ui'

import CodeContainer from './CodeContainer'
import OutputContainer from './OutputContainer'
import {inputConnection} from '../../utils/api'

const RunButton = () => {
  const {code} = CodeContainer.useContainer()
  const {clearOutputContent, setInput} = OutputContainer.useContainer()

  const handleClick = () => {
    clearOutputContent()

    const input = code.replaceAll('\n', '\\\n')
    setInput(input)

    inputConnection(`${input}\r`)
  }

  return (
    <Button
      height={majorScale(3)}
      iconBefore={PlayIcon}
      onClick={handleClick}
      disabled={code.trim() === ''}
    >
      Run
    </Button>
  )
}

export default RunButton
