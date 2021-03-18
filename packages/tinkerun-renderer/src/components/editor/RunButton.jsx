import {useMemo} from 'react'
import {Button, majorScale, PlayIcon} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'

import CodeContainer from './CodeContainer'

const RunButton = () => {
  const {code, runCode} = CodeContainer.useContainer()
  const disabled = code.trim() === ''

  const handleClick = () => runCode(code)

  return useMemo(() => (
    <Button
      height={majorScale(3)}
      iconBefore={PlayIcon}
      onClick={handleClick}
      disabled={disabled}
    >
      <FormattedMessage id='editor.run'/>
    </Button>
  ))
}

export default RunButton
