import {majorScale, Pane, Text} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import TagBadge from '../connections/TagBadge'
import Tooltip from '../Tooltip'
import {connectionAtom} from '../../stores/editor'

const ConnectionInfo = () => {
  const connection = useAtomValue(connectionAtom)

  return (
    <Pane
      display='flex'
      alignItems='center'
    >
      <Tooltip
        content={connection.name}
      >
        <Text
          size={400}
          maxWidth={180}
          textOverflow='ellipsis'
          overflow='hidden'
          whiteSpace='nowrap'
          marginRight={majorScale(1)}
          fontWeight='bold'
        >
          {connection.name}
        </Text>
      </Tooltip>

      <TagBadge tag={connection.tag}/>
    </Pane>
  )
}

export default ConnectionInfo
