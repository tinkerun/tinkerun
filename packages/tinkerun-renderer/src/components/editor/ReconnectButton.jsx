import {IconButton, majorScale, ResetIcon} from 'evergreen-ui'
import {useUpdateAtom} from 'jotai/utils'
import {useIntl} from 'react-intl'

import Tooltip from '../Tooltip'
import {reconnectAtom} from '../../stores/editor'

const ReconnectButton = () => {
  const intl = useIntl()
  const reconnect = useUpdateAtom(reconnectAtom)

  const handleClick = () => {
    reconnect()
  }

  return (
    <Tooltip
      content={intl.formatMessage({id: 'editor.reconnect'})}
    >
      <IconButton
        icon={ResetIcon}
        appearance='minimal'
        onClick={handleClick}
        height={majorScale(3)}
      />
    </Tooltip>
  )
}

export default ReconnectButton
