import {Button, FolderOpenIcon, majorScale} from 'evergreen-ui'

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
      Quick Connect
    </Button>
  )
}

export default QuickButton
