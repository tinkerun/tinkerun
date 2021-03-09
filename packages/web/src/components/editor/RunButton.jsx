import {Button, majorScale, PlayIcon} from 'evergreen-ui'

import EditorContainer from './EditorContainer'
import {inputConnection} from '../../utils/api'

const RunButton = () => {
  const {code} = EditorContainer.useContainer()

  const handleClick = () => {
    inputConnection(code)
  }

  return (
    <Button
      height={majorScale(3)}
      iconBefore={PlayIcon}
      onClick={handleClick}
    >
      Run
    </Button>
  )
}

export default RunButton
