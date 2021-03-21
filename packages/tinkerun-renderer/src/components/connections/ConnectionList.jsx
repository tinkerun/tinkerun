import {Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import ConnectionItem from './ConnectionItem'
import DeleteConfirm from './DeleteConfirm'
import {connectionListAtom} from '../../stores/connections'

const ConnectionList = () => {
  const connections = useAtomValue(connectionListAtom)

  return (
    <Pane>
      <DeleteConfirm/>
      {connections.map(connection => (
        <ConnectionItem
          key={connection.id}
          connection={connection}
        />
      ))}
    </Pane>
  )
}

export default ConnectionList
