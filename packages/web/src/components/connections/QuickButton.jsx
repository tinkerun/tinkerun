import {Button, FolderOpenIcon, majorScale} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'

import {quickConnect} from '../../utils/api'

const QuickButton = () => {
  const handleClick = () => {
    quickConnect()
  }

  return (
    <Button
      iconBefore={FolderOpenIcon}
      height={majorScale(3)}
      onClick={handleClick}
    >
      <FormattedMessage id='connections.quick_connect'/>
    </Button>
  )
}

export default QuickButton
